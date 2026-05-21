import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

const COVER_KEYS = ['cover_1','cover_2','cover_3','cover_4','cover_5','cover_6','cover_7','cover_8'] as const;

@customElement('nspanel-page-blinds')
export class NspanelPageBlinds extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  private _cover(entity: string, svc: 'open_cover' | 'close_cover' | 'stop_cover') {
    this.hass.callService('cover', svc, { entity_id: entity });
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

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="covers-list">
          ${covers.map(entity => {
            const e = h?.states[entity];
            if (!e) return html``;
            const name = (e.attributes['friendly_name'] as string) ?? entity;
            const pos  = e.attributes['current_position'] as number | undefined;
            return html`
              <div class="cover-row">
                <div class="cover-name">${name}</div>
                ${pos != null ? html`<div class="cover-pos">${pos}%</div>` : ''}
                <div class="cover-btns">
                  <button class="cov-btn" @click=${() => this._cover(entity, 'open_cover')}>▲</button>
                  <button class="cov-btn" @click=${() => this._cover(entity, 'stop_cover')}>■</button>
                  <button class="cov-btn" @click=${() => this._cover(entity, 'close_cover')}>▼</button>
                </div>
              </div>
            `;
          })}
        </div>

        ${(c.scene_up || c.scene_down) ? html`
          <div class="bottom-bar">
            ${c.scene_up   ? html`<button class="scene-btn" @click=${() => this._scene(c.scene_up!)}>▲ Alle</button>`   : ''}
            ${c.scene_down ? html`<button class="scene-btn" @click=${() => this._scene(c.scene_down!)}>▼ Alle</button>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { gap: var(--nsp-s2); }
    .covers-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }
    .cover-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      height: 46px;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .cover-name {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cover-pos {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      min-width: 30px;
      text-align: right;
    }
    .cover-btns { display: flex; gap: 4px; }
    .cov-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      color: var(--nsp-text-1);
      font-size: 11px;
      cursor: pointer;
    }
    .cov-btn:active { opacity: 0.6; }
    .bottom-bar { display: flex; gap: var(--nsp-s2); flex-shrink: 0; }
    .scene-btn {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      height: 46px;
      padding: 0 var(--nsp-s3);
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
    }
    .scene-btn:active { opacity: 0.6; }
  `];
}
