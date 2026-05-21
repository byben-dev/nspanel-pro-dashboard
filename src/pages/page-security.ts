import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens } from '../styles/tokens';

const CAM_KEYS = ['camera_1', 'camera_2', 'camera_3', 'camera_4'] as const;

@customElement('nspanel-page-security')
export class NspanelPageSecurity extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    const cams = CAM_KEYS
      .map(k => (c as Record<string, unknown>)[k] as string | undefined)
      .filter((e): e is string => !!e);

    if (cams.length === 0) {
      return html`
        <div class="page ${this.dark ? 'nsp-dark' : ''}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    }

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''} count-${cams.length}">
        ${cams.map(entity => {
          const e = h?.states[entity];
          const name = (e?.attributes['friendly_name'] as string) ?? entity;
          return html`
            <div class="cam-cell">
              ${e ? html`
                <ha-camera-stream
                  .hass=${h}
                  .stateObj=${e}
                  muted
                  autoPlay
                ></ha-camera-stream>
              ` : html`<div class="cam-unavail">Nicht verfügbar</div>`}
              <div class="cam-label">${name}</div>
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = [tokens, css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .page {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: var(--nsp-s2);
      background: #000;
      display: grid;
      gap: var(--nsp-s2);
      overflow: hidden;
    }
    .page.count-1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }
    .page.count-2 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; }
    .page.count-3 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .page.count-3 .cam-cell:first-child { grid-column: span 2; }
    .page.count-4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }

    .cam-cell {
      position: relative;
      background: #111;
      border-radius: var(--nsp-r1);
      overflow: hidden;
    }

    ha-camera-stream {
      display: block;
      width: 100%;
      height: 100%;
    }

    .cam-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px 8px 6px;
      background: linear-gradient(transparent, rgba(0,0,0,0.65));
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cam-unavail {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: rgba(255,255,255,0.25);
    }

    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: rgba(255,255,255,0.3);
    }
  `];
}
