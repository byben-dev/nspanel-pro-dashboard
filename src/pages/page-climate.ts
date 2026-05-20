import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

const placeholder = css`
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
`;

@customElement('nspanel-page-climate')
export class NspanelPageClimate extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;

  render() {
    return html`
      <div class="page">
        <div class="coming-soon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:0.2; margin-bottom: 12px">
            <path d="M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7z"/>
          </svg>
          <div>Climate</div>
          <div>Thermostat · Underfloor Heating</div>
          <div>— coming soon —</div>
        </div>
      </div>
    `;
  }

  static styles = [tokens, pageBase, placeholder];
}

