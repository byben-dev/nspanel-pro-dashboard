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

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    const pvE      = c.pv_entity             ? h?.states[c.pv_entity]             : null;
    const gridE    = c.grid_entity           ? h?.states[c.grid_entity]           : null;
    const evE      = c.ev_entity             ? h?.states[c.ev_entity]             : null;
    const pvTodayE = c.pv_today_entity       ? h?.states[c.pv_today_entity]       : null;
    const fcTodayE = c.forecast_today_entity ? h?.states[c.forecast_today_entity] : null;
    const fcTmrE   = c.forecast_tomorrow_entity ? h?.states[c.forecast_tomorrow_entity] : null;

    const pv      = pvE      ? parseFloat(pvE.state)      : null;
    const grid    = gridE    ? parseFloat(gridE.state)    : null;
    const evRangeE  = c.ev_range_entity ? h?.states[c.ev_range_entity] : null;
    const evRaw     = evE      ? parseFloat(evE.state)      : NaN;
    const ev        = isNaN(evRaw) ? null : evRaw;
    const evRangeRaw = evRangeE ? parseFloat(evRangeE.state) : NaN;
    const evRange    = isNaN(evRangeRaw) ? null : Math.round(evRangeRaw);
    const pvToday = pvTodayE ? parseFloat(pvTodayE.state) : null;
    const fcToday = fcTodayE ? parseFloat(fcTodayE.state) : null;
    const fcTmr   = fcTmrE   ? parseFloat(fcTmrE.state)   : null;

    const exporting = grid != null && grid < 0;
    const home = pv != null && grid != null ? pv + grid : null;

    const autarkyPct = (pv != null && home != null && home > 0)
      ? Math.min(pv / home, 1) * 100
      : (exporting ? 100 : null);
    const importPct = autarkyPct != null ? Math.max(100 - autarkyPct, 0) : null;

    const fcProgress = (fcToday != null && fcToday > 0 && pvToday != null)
      ? Math.min(pvToday / fcToday, 1) : null;

    const gridCard = grid != null ? {
      icon: exporting ? '⬆️' : '⬇️',
      label: exporting ? 'EINSPEISUNG' : 'NETZBEZUG',
      val: fmtPower(Math.abs(grid)),
      cls: exporting ? 'col-green' : 'col-orange',
    } : null;

    const extraCard = pvToday != null ? { icon: '☀️', label: 'HEUTE', val: fmtEnergy(pvToday), sub: null,                           cls: '' }
                    : ev      != null ? { icon: '🔋', label: 'AKKU',  val: `${Math.round(ev)}%`, sub: evRange ? `${evRange} km` : null, cls: '' }
                    : null;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">

        <!-- Hero card: PV production -->
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
            <div class="flow-labels">
              <span>Solar → Haus</span>
              <span>${Math.round(autarkyPct)}% autark</span>
            </div>
          ` : ''}
        </div>

        <!-- Bottom stat cards -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon">🏠</div>
            <div class="stat-label">VERBRAUCH</div>
            <div class="stat-value">${home != null ? fmtPower(Math.abs(home)) : '–'}</div>
          </div>
          ${gridCard ? html`
            <div class="stat-card">
              <div class="stat-icon">${gridCard.icon}</div>
              <div class="stat-label">${gridCard.label}</div>
              <div class="stat-value ${gridCard.cls}">${gridCard.val}</div>
            </div>
          ` : ''}
          ${extraCard ? html`
            <div class="stat-card">
              <div class="stat-icon">${extraCard.icon}</div>
              <div class="stat-label">${extraCard.label}</div>
              <div class="stat-value">${extraCard.val}</div>
              ${extraCard.sub ? html`<div class="stat-sub">${extraCard.sub}</div>` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Forecast row (optional) -->
        ${(fcToday != null || fcTmr != null) ? html`
          <div class="forecast-row">
            ${fcToday != null ? html`
              <div class="fc-card">
                <div class="fc-label">Prognose Heute</div>
                <div class="fc-val">${fmtEnergy(fcToday)}</div>
                ${fcProgress != null ? html`
                  <div class="fc-track"><div class="fc-fill" style="width:${fcProgress * 100}%"></div></div>
                  <div class="fc-sub">${pvToday != null ? fmtEnergy(pvToday) : ''} erreicht</div>
                ` : ''}
              </div>
            ` : ''}
            ${fcTmr != null ? html`
              <div class="fc-card">
                <div class="fc-label">Prognose Morgen</div>
                <div class="fc-val">${fmtEnergy(fcTmr)}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- EV row if configured alongside pvToday (not already shown in stat2) -->
        ${ev != null && pvToday != null ? html`
          <div class="ev-row">
            <span class="ev-label">🔋 ${Math.round(ev)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${ev}%"></div></div>
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { gap: var(--nsp-s2); }

    /* ── Hero card ── */
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

    .flow-labels {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: -4px;
    }

    /* ── Bottom stats ── */
    .stats-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .stat-card {
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
      gap: 2px;
    }

    .stat-icon { font-size: 16px; }

    .stat-label {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
    }

    .stat-value {
      font-family: var(--nsp-font);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .stat-value.col-green  { color: var(--nsp-green); }
    .stat-value.col-orange { color: var(--nsp-orange); }
    .stat-sub {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 1px;
    }

    /* ── EV row ── */
    .ev-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      flex-shrink: 0;
      padding: 0 2px;
    }
    .ev-label {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: var(--nsp-text-2);
      white-space: nowrap;
    }
    .ev-track {
      flex: 1;
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 2px;
    }

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
  `];
}
