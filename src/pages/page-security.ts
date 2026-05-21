import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens } from '../styles/tokens';

const CAM_KEYS = ['camera_1', 'camera_2', 'camera_3', 'camera_4'] as const;

@customElement('nspanel-page-security')
export class NspanelPageSecurity extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _tick = 0;
  @state() private _fullscreenCam: string | null = null;
  private _timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._timer = window.setInterval(() => { this._tick++; }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;
    const portrait = !!c.cameras_portrait;

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

    const cls = `page ${this.dark ? 'nsp-dark' : ''} count-${cams.length} ${portrait ? 'portrait' : ''}`;

    const renderCamContent = (entity: string) => {
      const e = h?.states[entity];
      if (!e) return html`<div class="cam-unavail">Not available</div>`;
      return e.attributes['frontend_stream_type']
        ? html`<ha-camera-stream .hass=${h} .stateObj=${e} muted autoPlay></ha-camera-stream>`
        : html`<img class="cam-img" src="/api/camera_proxy/${entity}?token=${e.attributes['access_token']}&_=${this._tick}" alt="${(e.attributes['friendly_name'] as string) ?? entity}" />`;
    };

    return html`
      <div class="${cls}">
        ${cams.map(entity => {
          const name = (h?.states[entity]?.attributes['friendly_name'] as string) ?? entity;
          return html`
            <div class="cam-cell" @click=${() => { this._fullscreenCam = entity; }}>
              ${renderCamContent(entity)}
              <div class="cam-label">${name}</div>
            </div>
          `;
        })}

        ${this._fullscreenCam ? html`
          <div class="cam-fullscreen" @click=${() => { this._fullscreenCam = null; }}>
            ${renderCamContent(this._fullscreenCam)}
            <div class="cam-label">${(h?.states[this._fullscreenCam]?.attributes['friendly_name'] as string) ?? this._fullscreenCam}</div>
            <div class="cam-close">✕</div>
          </div>
        ` : nothing}
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

    /* ── Landscape (default) ── */
    .page.count-1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }
    .page.count-2 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; }
    .page.count-3 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .page.count-3 .cam-cell:first-child { grid-column: span 2; }
    .page.count-4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }

    /* ── Portrait (9:16) ──
       Cells get their natural aspect ratio; grid rows are auto-sized.
       Cameras are centered in the available space.              */
    .page.portrait {
      align-content: center;
      justify-content: center;
      grid-auto-rows: auto;
    }
    .page.portrait.count-1 {
      grid-template-columns: auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-2 {
      grid-template-columns: auto auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-3 {
      grid-template-columns: auto auto auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-4 {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
    }
    /* Portrait cells: height fills available space, width follows 9:16 ratio */
    .page.portrait .cam-cell {
      height: calc((100% - var(--nsp-s2)) / 1);
      aspect-ratio: 9 / 16;
    }
    .page.portrait.count-2 .cam-cell,
    .page.portrait.count-3 .cam-cell {
      height: calc(100% - var(--nsp-s2) * 0);
    }
    .page.portrait.count-4 .cam-cell {
      height: calc((100% - var(--nsp-s2)) / 2);
    }
    /* Remove the count-3 first-child span in portrait mode */
    .page.portrait.count-3 .cam-cell:first-child { grid-column: unset; }

    /* ── Camera cell ── */
    .cam-cell {
      position: relative;
      background: #111;
      border-radius: var(--nsp-r1);
      overflow: hidden;
      min-width: 0;
      min-height: 0;
    }

    ha-camera-stream {
      display: block;
      width: 100%;
      height: 100%;
    }
    .cam-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
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

    .cam-fullscreen {
      position: absolute;
      inset: 0;
      background: #000;
      z-index: 10;
      cursor: pointer;
    }

    .cam-close {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 18px;
      color: rgba(255,255,255,0.8);
      line-height: 1;
      pointer-events: none;
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
