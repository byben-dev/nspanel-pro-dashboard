import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PageId } from '../types';
import { tokens } from '../styles/tokens';

const ICONS: Record<PageId, string> = {
  home:    'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  climate: 'M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z',
  blinds:  'M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z',
  media:   'M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z',
  energy:  'M7 2v11h3v9l7-12h-4l4-8z',
};

const LABELS: Record<PageId, string> = {
  home:    'Home',
  climate: 'Climate',
  blinds:  'Blinds',
  media:   'Media',
  energy:  'Energy',
};

@customElement('nspanel-bottom-nav')
export class NspanelBottomNav extends LitElement {
  @property({ type: Array }) pages: PageId[] = [];
  @property({ type: String }) activePage: PageId = 'home';

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
            <span>${LABELS[p]}</span>
          </button>
        `)}
      </nav>
    `;
  }

  static styles = [tokens, css`
    :host { display: block; }

    nav {
      height: var(--nsp-nav-h);
      background: var(--nsp-nav-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
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
    }

    button.active {
      color: var(--nsp-accent);
    }

    button svg {
      flex-shrink: 0;
    }

    span {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: -0.01em;
    }
  `];
}
