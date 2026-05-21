import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function fmtDur(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

@customElement('nspanel-page-media')
export class NspanelPageMedia extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _tick = 0;
  private _timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._timer = window.setInterval(() => { this._tick++; }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  private _call(service: string, data?: Record<string, unknown>) {
    const entity = this.config?.media_player;
    if (!entity) return;
    const [domain, svc] = service.split('.');
    this.hass.callService(domain, svc, { entity_id: entity, ...data });
  }

  private _volume(e: Event) {
    this._call('media_player.volume_set', { volume_level: (e.target as HTMLInputElement).valueAsNumber });
  }

  render() {
    const entity = this.config?.media_player;
    const mp = entity ? this.hass?.states[entity] : null;

    if (!mp) return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}"><div class="empty">No media player configured</div></div>
    `;

    const isOff = mp.state === 'off' || mp.state === 'unavailable' || mp.state === 'standby';
    if (isOff) return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="offline">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:.25">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
          </svg>
          <div class="offline-name">${mp.attributes['friendly_name'] ?? entity}</div>
          <div class="offline-hint">Wiedergabe in der Spotify- oder B&amp;O-App<br>starten, um sie hier zu steuern</div>
        </div>
      </div>
    `;

    const isPlaying = mp.state === 'playing';
    const title    = mp.attributes['media_title']    as string ?? '';
    const artist   = mp.attributes['media_artist']   as string ?? '';
    const picture  = mp.attributes['entity_picture'] as string ?? '';
    const volume   = mp.attributes['volume_level']   as number ?? 0.5;
    const duration = mp.attributes['media_duration'] as number ?? 0;
    const position = mp.attributes['media_position'] as number ?? 0;
    const posAt    = mp.attributes['media_position_updated_at'] as string ?? '';

    let curPos = position;
    if (isPlaying && posAt) {
      curPos = Math.min(position + (Date.now() - new Date(posAt).getTime()) / 1000, duration);
    }
    const progress = duration > 0 ? curPos / duration : 0;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="art-wrap">
          ${picture
            ? html`<img class="art" src="${picture}" alt="cover" />`
            : html`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${title || (mp.state === 'off' ? 'Aus' : 'Kein Titel')}</div>
          ${artist ? html`<div class="track-artist">${artist}</div>` : ''}
        </div>

        ${duration > 0 ? html`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${progress * 100}%">
                <div class="progress-thumb"></div>
              </div>
            </div>
            <div class="progress-times">
              <span>${fmtDur(curPos)}</span>
              <span>-${fmtDur(duration - curPos)}</span>
            </div>
          </div>
        ` : ''}

        <div class="controls">
          <button class="ctrl-btn" @click=${() => this._call('media_player.media_previous_track')}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button class="ctrl-btn play" @click=${() => this._call('media_player.media_play_pause')}>
            ${isPlaying
              ? html`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : html`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          <button class="ctrl-btn" @click=${() => this._call('media_player.media_next_track')}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { align-items: center; gap: var(--nsp-s3); padding: var(--nsp-s4); }

    .art-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
    }
    .art {
      width: 172px;
      height: 172px;
      border-radius: var(--nsp-r3);
      object-fit: cover;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    }
    .art-empty {
      width: 172px;
      height: 172px;
      border-radius: var(--nsp-r3);
      background: var(--nsp-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      color: var(--nsp-text-3);
    }

    .track-info { text-align: center; width: 100%; }
    .track-title {
      font-family: var(--nsp-font);
      font-size: 18px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
    }
    .track-artist {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      margin-top: 2px;
    }

    .progress-wrap { width: 100%; }
    .progress-bar {
      height: 2px;
      background: var(--nsp-surface-3);
      border-radius: 1px;
      overflow: visible;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: var(--nsp-text-1);
      border-radius: 1px;
      position: relative;
    }
    .progress-thumb {
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--nsp-text-1);
    }
    .progress-times {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 6px;
    }

    .controls { display: flex; align-items: center; gap: var(--nsp-s5); }
    .ctrl-btn {
      border: none;
      background: none;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
    }
    .ctrl-btn:active { opacity: 0.6; }
    .ctrl-btn.play {
      width: 60px;
      height: 60px;
      background: var(--nsp-accent);
      color: white;
      padding: 0;
      border-radius: 50%;
    }

    .offline {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--nsp-s3);
      text-align: center;
    }
    .offline-name {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
    .offline-hint {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 1.5;
    }

    .vol-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      width: 100%;
      color: var(--nsp-text-3);
    }
    .vol-slider {
      flex: 1;
      -webkit-appearance: none;
      height: 2px;
      border-radius: 1px;
      background: var(--nsp-surface-3);
      outline: none;
    }
    .vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--nsp-text-1);
      cursor: pointer;
    }

    .empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }
  `];
}
