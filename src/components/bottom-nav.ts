import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PageId } from '../types';
import { tokens } from '../styles/tokens';

const ICONS: Record<PageId, string> = {
  home:     'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  climate:  'M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z',
  blinds:   'M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z',
  media:    'M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z',
  energy:   'M7 2v11h3v9l7-12h-4l4-8z',
  security: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',
  wifi:     'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z',
};

const LABELS: Record<PageId, string> = {
  home:     'Home',
  climate:  'Climate',
  blinds:   'Blinds',
  media:    'Media',
  energy:   'Energy',
  security: 'Security',
  wifi:     'WiFi',
};

@customElement('nspanel-bottom-nav')
export class NspanelBottomNav extends LitElement {
  @property({ type: Array }) pages: PageId[] = [];
  @property({ type: String }) activePage: PageId = 'home';
  @property({ attribute: false }) customLabels: Partial<Record<PageId, string>> = {};

  private _tap(page: PageId) {
    this.dispatchEvent(new CustomEvent('page-change', { detail: { page }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <nav>
        ${this.pages.map(p => html`
          <button
            class=${p === this.activePage ? 'active' : ''}
            @click=${() => this._tap(p)}
            aria-label=${LABELS[p]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${ICONS[p]} />
            </svg>
            <span>${this.customLabels[p] ?? LABELS[p]}</span>
          </button>
        `)}
      </nav>
    `;
  }

  static styles = [tokens, css`
    :host { display: block; }

    nav {
      height: var(--nsp-nav-h);
      background: var(--nsp-bg);
      border-top: 0.5px solid var(--nsp-separator);
      display: flex;
      align-items: stretch;
    }

    button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--nsp-text-3);
      transition: color 0.15s;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }

    button.active {
      color: var(--nsp-accent);
    }

    button.active::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 72px;
      height: 48px;
      background: rgba(100, 210, 255, 0.18);
      border-radius: 14px;
    }

    button svg {
      flex-shrink: 0;
      position: relative;
    }

    span {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: -0.01em;
      position: relative;
    }
  `];
}
