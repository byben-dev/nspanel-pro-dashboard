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
            const pos      = e.attributes['current_position'] as number | undefined;
            const posW     = pos != null ? (100 - pos) : null;
            const opening  = e.state === 'opening';
            const closing  = e.state === 'closing';
            return html`
              <div class="cover-row">
                ${posW != null ? html`
                  <div class="pos-bar" style="width:${posW}%"></div>
                ` : ''}
                <div class="cover-name">${name}</div>
                ${pos != null ? html`<div class="cover-pos">${pos}%</div>` : ''}
                <button class="cov-btn ${opening ? 'active' : ''}"
                  @click=${() => this._cover(entity, opening ? 'stop_cover' : 'open_cover')}
                  aria-label="${opening ? 'Stop' : 'Öffnen'}">${opening ? '■' : '▲'}</button>
                <button class="cov-btn ${closing ? 'active' : ''}"
                  @click=${() => this._cover(entity, closing ? 'stop_cover' : 'close_cover')}
                  aria-label="${closing ? 'Stop' : 'Schließen'}">${closing ? '■' : '▼'}</button>
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
      gap: var(--nsp-s2);
      overflow-y: auto;
      min-height: 0;
    }

    .cover-row {
      position: relative;
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
      height: 52px;
      flex-shrink: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Position shown as a frosted bar on the left edge */
    .pos-bar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: var(--nsp-surface-3);
      border-radius: var(--nsp-r2) 0 0 var(--nsp-r2);
      pointer-events: none;
      transition: width 0.4s ease;
      max-width: 100%;
    }

    .cover-name {
      position: relative;
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .cover-pos {
      position: relative;
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      flex-shrink: 0;
    }

    .cov-btn {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      color: var(--nsp-text-1);
      font-size: 13px;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cov-btn.active { background: var(--nsp-orange); color: white; }
    .cov-btn:active { opacity: 0.5; }

    .bottom-bar {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

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
