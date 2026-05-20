import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function fmtPower(w: number): string {
  return Math.abs(w) >= 1000 ? `${(w / 1000).toFixed(1)} kW` : `${Math.round(w)} W`;
}

@customElement('nspanel-page-energy')
export class NspanelPageEnergy extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    const pvE   = c.pv_entity   ? h?.states[c.pv_entity]   : null;
    const gridE = c.grid_entity ? h?.states[c.grid_entity] : null;
    const evE   = c.ev_entity   ? h?.states[c.ev_entity]   : null;

    const pv   = pvE   ? parseFloat(pvE.state)   : null;
    const grid = gridE ? parseFloat(gridE.state) : null;
    const ev   = evE   ? parseFloat(evE.state)   : null;

    const exporting = grid != null && grid < 0;

    // Home consumption = PV production + grid import (or - grid export)
    const home = pv != null && grid != null
      ? pv + (exporting ? grid : 0) + (!exporting ? grid : 0)
      : null;

    return html`
      <div class="page">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${pv != null ? fmtPower(pv) : '–'}</div>
            <div class="stat-lbl">Erzeugung</div>
          </div>

          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${home != null ? fmtPower(Math.abs(home)) : '–'}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <div class="stat grid ${exporting ? 'export' : 'import'}">
            <div class="stat-icon">${exporting ? '⬆️' : '⬇️'}</div>
            <div class="stat-val">${grid != null ? fmtPower(Math.abs(grid)) : '–'}</div>
            <div class="stat-lbl">${exporting ? 'Einspeisung' : 'Netzbezug'}</div>
          </div>

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
    }
    .stats-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
    }
    .stat {
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      gap: 3px;
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
  `];
}
