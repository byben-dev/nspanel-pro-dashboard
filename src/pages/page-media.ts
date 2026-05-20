import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
      <div class="page"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;

    const isPlaying = mp.state === 'playing';
    const title     = mp.attributes['media_title']    as string ?? '';
    const artist    = mp.attributes['media_artist']   as string ?? '';
    const picture   = mp.attributes['entity_picture'] as string ?? '';
    const volume    = mp.attributes['volume_level']   as number ?? 0.5;
    const duration  = mp.attributes['media_duration'] as number ?? 0;
    const position  = mp.attributes['media_position'] as number ?? 0;
    const posAt     = mp.attributes['media_position_updated_at'] as string ?? '';

    let curPos = position;
    if (isPlaying && posAt) {
      curPos = Math.min(position + (Date.now() - new Date(posAt).getTime()) / 1000, duration);
    }
    const progress = duration > 0 ? curPos / duration : 0;

    return html`
      <div class="page">
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
              <div class="progress-fill" style="width:${progress * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${fmtDur(curPos)}</span>
              <span>${fmtDur(duration)}</span>
            </div>
          </div>
        ` : ''}

        <div class="controls">
          <button class="ctrl-btn" @click=${() => this._call('media_player.media_previous_track')}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button class="ctrl-btn play" @click=${() => this._call('media_player.media_play_pause')}>
            ${isPlaying
              ? html`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : html`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          <button class="ctrl-btn" @click=${() => this._call('media_player.media_next_track')}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

        <div class="vol-row">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
          </svg>
          <input class="vol-slider" type="range" min="0" max="1" step="0.02"
            .value=${String(volume)} @change=${this._volume} />
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { align-items: center; gap: var(--nsp-s3); }
    .art-wrap { flex: 1; display: flex; align-items: center; justify-content: center; }
    .art {
      width: 150px;
      height: 150px;
      border-radius: var(--nsp-r3);
      object-fit: cover;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .art-empty {
      width: 150px;
      height: 150px;
      border-radius: var(--nsp-r3);
      background: var(--nsp-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      color: var(--nsp-text-3);
    }
    .track-info { text-align: center; width: 100%; }
    .track-title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .track-artist {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      margin-top: 2px;
    }
    .progress-wrap { width: 100%; }
    .progress-bar {
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: var(--nsp-accent);
      border-radius: 2px;
    }
    .progress-times {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 4px;
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
      width: 56px;
      height: 56px;
      background: var(--nsp-accent);
      color: white;
      padding: 0;
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
      height: 4px;
      border-radius: 2px;
      background: var(--nsp-surface-3);
      outline: none;
    }
    .vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--nsp-accent);
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
