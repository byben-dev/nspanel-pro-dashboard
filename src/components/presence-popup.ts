import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens } from '../styles/tokens';
import { PERSON_SLOTS } from '../utils/persons';

@customElement('nspanel-presence-popup')
export class NspanelPresencePopup extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;

  private _dismiss() {
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  private _formatSince(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const time = d.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
    if (d.toDateString() === now.toDateString()) return time;
    const date = d.toLocaleDateString('de-AT', { day: '2-digit', month: '2-digit' });
    return `${date}, ${time}`;
  }

  private get _people() {
    const c = this.config ?? {};
    const h = this.hass;
    return PERSON_SLOTS
      .map(({ key, iconKey, icon }) => {
        const entityId = c[key];
        const state = entityId ? h?.states[entityId] : undefined;
        if (!entityId || !state) return null;
        const home = state.state === 'home';
        const name = (state.attributes['friendly_name'] as string) ?? entityId.split('.')[1];
        const since = this._formatSince(state.last_changed);
        return { icon: c[iconKey] || icon, name, since, home };
      })
      .filter((p): p is { icon: string; name: string; since: string; home: boolean } => p !== null)
      .sort((a, b) => Number(b.home) - Number(a.home));
  }

  render() {
    const people = this._people;
    return html`
      <div class="overlay" @click=${this._dismiss}>
        <div class="popup" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <span class="title">Anwesenheit</span>
          </div>

          <div class="list">
            ${people.map(p => html`
              <div class="row ${p.home ? '' : 'away'}">
                <span class="icon">${p.icon}</span>
                <span class="name">${p.name}</span>
                <span class="since">${p.home ? 'seit' : 'abwesend seit'} ${p.since}</span>
              </div>
            `)}
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
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .icon { font-size: 20px; flex-shrink: 0; }
    .row.away .icon { opacity: 0.4; }
    .row.away .name { color: var(--nsp-text-3); }
    .name {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
    }
    .since {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
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
