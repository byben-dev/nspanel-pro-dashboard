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

    const pvE        = c.pv_entity             ? h?.states[c.pv_entity]             : null;
    const gridE      = c.grid_entity           ? h?.states[c.grid_entity]           : null;
    const evE        = c.ev_entity             ? h?.states[c.ev_entity]             : null;
    const pvTodayE   = c.pv_today_entity       ? h?.states[c.pv_today_entity]       : null;
    const fcTodayE   = c.forecast_today_entity ? h?.states[c.forecast_today_entity] : null;
    const fcTmrE     = c.forecast_tomorrow_entity ? h?.states[c.forecast_tomorrow_entity] : null;

    const pv       = pvE      ? parseFloat(pvE.state)      : null;
    const grid     = gridE    ? parseFloat(gridE.state)    : null;
    const ev       = evE      ? parseFloat(evE.state)      : null;
    const pvToday  = pvTodayE ? parseFloat(pvTodayE.state) : null;
    const fcToday  = fcTodayE ? parseFloat(fcTodayE.state) : null;
    const fcTmr    = fcTmrE   ? parseFloat(fcTmrE.state)   : null;

    const exporting = grid != null && grid < 0;
    const home = pv != null && grid != null
      ? pv + (exporting ? grid : 0) + (!exporting ? grid : 0)
      : null;

    // Progress: how much of today's forecast has been produced
    const fcProgress = (fcToday != null && fcToday > 0 && pvToday != null)
      ? Math.min(pvToday / fcToday, 1) : null;

    const hasForecast = fcToday != null || fcTmr != null;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <!-- PV Production -->
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${pv != null ? fmtPower(pv) : '–'}</div>
            <div class="stat-lbl">Erzeugung</div>
            ${pvToday != null ? html`
              <div class="stat-sub">Heute ${fmtEnergy(pvToday)}</div>
            ` : ''}
          </div>

          <!-- Home Consumption -->
          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${home != null ? fmtPower(Math.abs(home)) : '–'}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <!-- Grid -->
          <div class="stat grid ${exporting ? 'export' : 'import'}">
            <div class="stat-icon">${exporting ? '⬆️' : '⬇️'}</div>
            <div class="stat-val">${grid != null ? fmtPower(Math.abs(grid)) : '–'}</div>
            <div class="stat-lbl">${exporting ? 'Einspeisung' : 'Netzbezug'}</div>
          </div>

          <!-- Tesla / EV -->
          <div class="stat ev ${!evE ? 'unavail' : ''}">
            <div class="stat-icon">🔋</div>
            <div class="stat-val">${ev != null ? `${Math.round(ev)}%` : '–'}</div>
            <div class="stat-lbl">Tesla</div>
            ${ev != null ? html`
              <div class="ev-track">
                <div class="ev-fill" style="width:${ev}%"></div>
              </div>
            ` : html`<div class="stat-hint">nicht verbunden</div>`}
          </div>
        </div>

        <!-- Forecast row -->
        ${hasForecast ? html`
          <div class="forecast-row">
            ${fcToday != null ? html`
              <div class="fc-card">
                <div class="fc-label">Prognose Heute</div>
                <div class="fc-val">${fmtEnergy(fcToday)}</div>
                ${fcProgress != null ? html`
                  <div class="fc-track">
                    <div class="fc-fill" style="width:${fcProgress * 100}%"></div>
                  </div>
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
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .pg-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      text-align: center;
      flex-shrink: 0;
    }
    .stats-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
      min-height: 0;
    }
    .stat {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      gap: 3px;
      overflow: hidden;
    }
    .stat.unavail { opacity: 0.45; }
    .stat-icon { font-size: 22px; }
    .stat-val {
      font-family: var(--nsp-font);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .stat-lbl {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .stat-sub {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }
    .stat-hint {
      font-family: var(--nsp-font);
      font-size: 10px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }
    .stat.pv    .stat-val { color: var(--nsp-yellow); }
    .stat.export .stat-val { color: var(--nsp-green); }
    .stat.import .stat-val { color: var(--nsp-orange); }

    .ev-track {
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      margin-top: 4px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 2px;
    }

    /* Forecast row */
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
      margin-top: 3px;
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
