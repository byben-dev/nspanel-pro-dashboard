import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

const COVER_KEYS = ['cover_1','cover_2','cover_3','cover_4','cover_5','cover_6','cover_7','cover_8'] as const;

@customElement('nspanel-page-blinds')
export class NspanelPageBlinds extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _moving: Record<string, 'up' | 'down'> = {};
  private _movingFrom: Record<string, string> = {};

  updated(changed: Map<string, unknown>) {
    if (!changed.has('hass') || !this.hass) return;
    const next = { ...this._moving };
    let dirty = false;
    for (const entity of Object.keys(next)) {
      const e = this.hass.states[entity];
      if (!e) continue;
      const dir  = next[entity];
      const curr = e.state;
      const pos  = e.attributes['current_position'] as number | undefined;
      const from = this._movingFrom[entity];
      // Only clear once the cover has actually reached the target end —
      // i.e. the state changed to an end position different from where we started.
      const atEnd = dir === 'up'   ? (curr === 'open'   || pos === 100)
                  : dir === 'down' ? (curr === 'closed'  || pos === 0)
                  : false;
      if (atEnd && curr !== from) {
        delete next[entity];
        delete this._movingFrom[entity];
        dirty = true;
      }
    }
    if (dirty) this._moving = next;
  }

  private _cover(entity: string, svc: 'open_cover' | 'close_cover' | 'stop_cover') {
    this.hass.callService('cover', svc, { entity_id: entity });
    if (svc === 'open_cover') {
      this._movingFrom[entity] = this.hass.states[entity]?.state ?? '';
      this._moving = { ...this._moving, [entity]: 'up' };
    } else if (svc === 'close_cover') {
      this._movingFrom[entity] = this.hass.states[entity]?.state ?? '';
      this._moving = { ...this._moving, [entity]: 'down' };
    } else {
      const m = { ...this._moving };
      delete m[entity];
      delete this._movingFrom[entity];
      this._moving = m;
    }
  }

  private _scene(entity: string) {
    const domain = entity.split('.')[0];
    this.hass.callService(domain === 'scene' ? 'scene' : 'script', 'turn_on', { entity_id: entity });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    const covers = COVER_KEYS
      .map(k => (c as Record<string, unknown>)[k] as string | undefined)
      .filter((e): e is string => !!e);

    const openCount   = covers.filter(id => h?.states[id]?.state === 'open').length;
    const closedCount = covers.filter(id => h?.states[id]?.state === 'closed').length;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="summary-bar">
          <span class="summary-text">
            <span class="summary-open">${openCount} Offen</span>
            <span class="summary-dot"> · </span>
            <span class="summary-closed">${closedCount} Zu</span>
          </span>
          <div class="summary-actions">
            ${c.scene_up   ? html`<button class="pill-btn" @click=${() => this._scene(c.scene_up!)}>↑ Alle</button>`   : ''}
            ${c.scene_down ? html`<button class="pill-btn" @click=${() => this._scene(c.scene_down!)}>↓ Alle</button>` : ''}
          </div>
        </div>

        <div class="covers-grid">
          ${covers.map((entity, idx) => {
            const e = h?.states[entity];
            if (!e) return html``;
            const name   = (e.attributes['friendly_name'] as string) ?? entity;
            const pos    = e.attributes['current_position'] as number | undefined;
            const moving = this._moving[entity];
            const stLbl  = pos != null ? `${pos}%`
                         : e.state === 'open'   ? 'Offen'
                         : e.state === 'closed' ? 'Zu'
                         : '–';
            const stCls  = e.state === 'open'   ? 'st-open'
                         : e.state === 'closed' ? 'st-closed'
                         : 'st-mid';
            return html`
              <div class="cover-card">
                <div class="cover-info">
                  <div class="cover-name-row">
                    <span class="cover-num">${String(idx + 1).padStart(2, '0')}</span>
                    <span class="cover-name">${name}</span>
                  </div>
                  <div class="cover-status ${stCls}">${stLbl}</div>
                </div>
                <div class="cover-btns">
                  <button class="cov-btn ${moving === 'up' ? 'active' : ''}"
                    @click=${() => this._cover(entity, moving === 'up' ? 'stop_cover' : 'open_cover')}
                    aria-label="${moving === 'up' ? 'Stop' : 'Öffnen'}">${moving === 'up' ? '■' : '↑'}</button>
                  <button class="cov-btn ${moving === 'down' ? 'active' : ''}"
                    @click=${() => this._cover(entity, moving === 'down' ? 'stop_cover' : 'close_cover')}
                    aria-label="${moving === 'down' ? 'Stop' : 'Schließen'}">${moving === 'down' ? '■' : '↓'}</button>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { padding: var(--nsp-s3); gap: var(--nsp-s2); }

    .summary-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      padding: 0 2px;
      height: 28px;
    }

    .summary-text {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
    }
    .summary-open   { color: var(--nsp-green); font-weight: 600; }
    .summary-dot    { color: var(--nsp-text-3); }
    .summary-closed { color: var(--nsp-text-3); }

    .summary-actions {
      display: flex;
      gap: var(--nsp-s1);
    }

    .pill-btn {
      height: 28px;
      padding: 0 12px;
      border-radius: 14px;
      border: none;
      background: var(--nsp-accent);
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: white;
      cursor: pointer;
    }
    .pill-btn:active { opacity: 0.7; }

    .covers-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      align-content: start;
      gap: var(--nsp-s2);
      overflow-y: auto;
      min-height: 0;
    }

    .cover-card {
      display: flex;
      align-items: center;
      padding: 0 var(--nsp-s2) 0 var(--nsp-s3);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      min-height: 68px;
      gap: var(--nsp-s2);
      box-sizing: border-box;
    }

    .cover-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .cover-name-row {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .cover-num {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      color: var(--nsp-accent);
      background: rgba(100, 210, 255, 0.18);
      padding: 2px 5px;
      border-radius: 4px;
      flex-shrink: 0;
      letter-spacing: 0.02em;
    }

    .cover-name {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .cover-status {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 500;
    }
    .cover-status.st-open   { color: var(--nsp-green); }
    .cover-status.st-closed { color: var(--nsp-text-3); }
    .cover-status.st-mid    { color: var(--nsp-text-3); opacity: 0.5; }

    .cover-btns {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .cov-btn {
      width: 28px;
      height: 28px;
      border-radius: var(--nsp-r1);
      border: none;
      background: transparent;
      color: var(--nsp-text-2);
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cov-btn.active { background: var(--nsp-orange); color: white; border-radius: var(--nsp-r1); }
    .cov-btn:active { opacity: 0.5; }
  `];
}
