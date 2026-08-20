import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../styles/tokens';
import type { TrashEvent } from './status-bar';

@customElement('nspanel-trash-popup')
export class NspanelTrashPopup extends LitElement {
  @property({ attribute: false }) events: TrashEvent[] = [];

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="overlay" @click=${this._dismiss}>
        <div class="popup" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <span class="title">Müllabholung</span>
          </div>

          <div class="list">
            ${this.events.length > 0 ? this.events.map(e => html`
              <div class="row">
                <span class="icons">${e.icons}</span>
                <span class="label">${e.label}</span>
              </div>
            `) : html`<div class="empty">Keine Termine bekannt</div>`}
          </div>

          <button class="dismiss" @click=${this._dismiss}>Schließen</button>
        </div>
      </div>
    `;
  }

  static styles = [tokens, css`
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .popup {
      background: var(--nsp-surface);
      border-radius: var(--nsp-r4);
      width: 300px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }

    .header {
      padding: var(--nsp-s4) var(--nsp-s5) var(--nsp-s2);
    }

    .title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .list {
      display: flex;
      flex-direction: column;
      padding: 0 var(--nsp-s5);
      gap: var(--nsp-s3);
      max-height: 280px;
      overflow-y: auto;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .icons {
      font-size: 18px;
      flex-shrink: 0;
      width: 44px;
    }
    .label {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
    }

    .empty {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      padding: var(--nsp-s2) 0;
    }

    .dismiss {
      margin: var(--nsp-s4);
      padding: var(--nsp-s3) var(--nsp-s4);
      border-radius: var(--nsp-r2);
      border: none;
      background: var(--nsp-bg-secondary);
      color: var(--nsp-accent);
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  `];
}
