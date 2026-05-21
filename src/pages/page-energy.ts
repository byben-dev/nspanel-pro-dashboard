import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function fmtPower(w: number): string {
  return Math.abs(w) >= 1000 ? `${(w / 1000).toFixed(1)} kW` : `${Math.round(w)} W`;
}

function fmtEnergy(kwh: number): string {
  return `${kwh.toFixed(1)} kWh`;
}

@customElement('nspanel-page-energy')
export class NspanelPageEnergy extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  private _setMode(option: string) {
    const entity = this.config.evcc_mode_entity;
    if (!entity) return;
    this.hass.callService('select', 'select_option', { entity_id: entity, option });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    // Power
    const pvE   = c.pv_entity   ? h?.states[c.pv_entity]   : null;
    const gridE = c.grid_entity ? h?.states[c.grid_entity] : null;
    const pv    = pvE   ? parseFloat(pvE.state)   : null;
    const grid  = gridE ? parseFloat(gridE.state) : null;

    const exporting = grid != null && grid < 0;
    const home = pv != null && grid != null ? pv + grid : null;
    const autarkyPct = (pv != null && home != null && home > 0)
      ? Math.min(pv / home, 1) * 100
      : (exporting ? 100 : null);
    const importPct = autarkyPct != null ? Math.max(100 - autarkyPct, 0) : null;

    // Forecast
    const pvTodayE = c.pv_today_entity          ? h?.states[c.pv_today_entity]          : null;
    const fcTodayE = c.forecast_today_entity    ? h?.states[c.forecast_today_entity]    : null;
    const fcTmrE   = c.forecast_tomorrow_entity ? h?.states[c.forecast_tomorrow_entity] : null;
    const pvToday  = pvTodayE ? parseFloat(pvTodayE.state) : null;
    const fcToday  = fcTodayE ? parseFloat(fcTodayE.state) : null;
    const fcTmr    = fcTmrE   ? parseFloat(fcTmrE.state)   : null;
    const fcProgress = (fcToday != null && fcToday > 0 && pvToday != null)
      ? Math.min(pvToday / fcToday, 1) : null;

    // EV
    const evE      = c.ev_entity        ? h?.states[c.ev_entity]        : null;
    const evRangeE = c.ev_range_entity  ? h?.states[c.ev_range_entity]  : null;
    const evModeE  = c.evcc_mode_entity ? h?.states[c.evcc_mode_entity] : null;

    const evRaw      = evE      ? parseFloat(evE.state)      : NaN;
    const ev         = isNaN(evRaw) ? null : evRaw;
    const evRangeRaw = evRangeE ? parseFloat(evRangeE.state) : NaN;
    const evRange    = isNaN(evRangeRaw) ? null : Math.round(evRangeRaw);
    const evMode     = evModeE?.state ?? null;
    const evOptions  = (evModeE?.attributes['options'] as string[] | undefined) ?? [];

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">

        <!-- Hero: PV + grid state -->
        <div class="hero-card">
          <div class="hero-top">
            <div>
              <div class="hero-label">PV-ERZEUGUNG</div>
              <div class="hero-value">${pv != null ? fmtPower(pv) : '–'}</div>
            </div>
            <div class="hero-icon">☀️</div>
          </div>

          ${autarkyPct != null ? html`
            <div class="flow-bar">
              <div class="flow-solar" style="width:${autarkyPct}%"></div>
              <div class="flow-grid"  style="width:${importPct}%"></div>
            </div>
          ` : ''}

          ${grid != null ? html`
            <div class="grid-line ${exporting ? 'grid-export' : 'grid-import'}">
              <span>${exporting ? '⬆️' : '⬇️'} ${fmtPower(Math.abs(grid))} ${exporting ? 'Einspeisung' : 'Netzbezug'}</span>
              ${autarkyPct != null ? html`<span>${Math.round(autarkyPct)}% autark</span>` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Forecast -->
        ${(pvToday != null || fcToday != null || fcTmr != null) ? html`
          <div class="forecast-row">
            ${(pvToday != null || fcToday != null) ? html`
              <div class="fc-card">
                <div class="fc-label">Heute</div>
                <div class="fc-val">${fcToday != null ? fmtEnergy(fcToday) : fmtEnergy(pvToday!)}</div>
                ${fcProgress != null ? html`
                  <div class="fc-track"><div class="fc-fill" style="width:${fcProgress * 100}%"></div></div>
                ` : ''}
              </div>
            ` : ''}
            ${fcTmr != null ? html`
              <div class="fc-card">
                <div class="fc-label">Morgen</div>
                <div class="fc-val">${fmtEnergy(fcTmr)}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- EV card (only when connected) -->
        ${ev != null ? html`
          <div class="ev-card">
            <div class="ev-top">
              <span class="ev-pct">🚗 ${Math.round(ev)}%</span>
              <div class="ev-track"><div class="ev-fill" style="width:${ev}%"></div></div>
              ${evRange != null ? html`<span class="ev-km">${evRange} km</span>` : ''}
            </div>
            ${evOptions.length > 0 ? html`
              <div class="ev-modes">
                ${evOptions.map(opt => html`
                  <button class="mode-btn ${evMode === opt ? 'active' : ''}"
                    @click=${() => this._setMode(opt)}>${opt}</button>
                `)}
              </div>
            ` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { gap: var(--nsp-s2); }

    /* ── Hero ── */
    .hero-card {
      flex: 1;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--nsp-s3);
      min-height: 0;
    }
    .hero-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .hero-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
      margin-bottom: 4px;
    }
    .hero-value {
      font-family: var(--nsp-font);
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-yellow);
      line-height: 1;
    }
    .hero-icon { font-size: 28px; }

    .flow-bar {
      height: 6px;
      border-radius: 3px;
      background: var(--nsp-surface-3);
      display: flex;
      overflow: hidden;
    }
    .flow-solar {
      height: 100%;
      background: var(--nsp-yellow);
      border-radius: 3px 0 0 3px;
      transition: width 0.6s ease;
    }
    .flow-grid {
      height: 100%;
      background: var(--nsp-accent);
      transition: width 0.6s ease;
    }

    .grid-line {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
    }
    .grid-export { color: var(--nsp-green); }
    .grid-import { color: var(--nsp-orange); }

    /* ── Forecast ── */
    .forecast-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }
    .fc-card {
      flex: 1;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .fc-label {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--nsp-text-3);
    }
    .fc-val {
      font-family: var(--nsp-font);
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-yellow);
    }
    .fc-track {
      height: 3px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .fc-fill {
      height: 100%;
      background: var(--nsp-yellow);
      border-radius: 2px;
      opacity: 0.7;
    }
    .fc-sub {
      font-family: var(--nsp-font);
      font-size: 10px;
      color: var(--nsp-text-3);
    }

    /* ── EV card ── */
    .ev-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }
    .ev-top {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
    }
    .ev-pct {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-track {
      flex: 1;
      height: 6px;
      background: var(--nsp-surface-3);
      border-radius: 3px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 3px;
    }
    .ev-km {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: var(--nsp-text-3);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-modes {
      display: flex;
      gap: var(--nsp-s1);
    }
    .mode-btn {
      flex: 1;
      height: 32px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 600;
      color: var(--nsp-text-2);
      cursor: pointer;
      white-space: nowrap;
    }
    .mode-btn.active {
      background: var(--nsp-accent);
      color: white;
    }
    .mode-btn:active { opacity: 0.6; }
  `];
}
