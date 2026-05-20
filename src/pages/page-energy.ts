import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

@customElement('nspanel-page-energy')
export class NspanelPageEnergy extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;

  render() {
    return html`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
          </svg>
          <div>Energy</div>
          <div>PV · Tesla · evcc · Garden Light</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 2;
    }
    .coming-soon div:first-of-type {
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
  `];
}
