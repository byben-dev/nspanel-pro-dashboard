import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens } from '../styles/tokens';

const WEATHER_ICON: Record<string, string> = {
  'sunny': '☀️', 'clear-night': '🌙', 'partlycloudy': '⛅',
  'cloudy': '☁️', 'fog': '🌫️', 'rainy': '🌦️', 'pouring': '🌧️',
  'snowy': '❄️', 'snowy-rainy': '🌨️', 'hail': '🌨️',
  'lightning': '⚡', 'lightning-rainy': '⛈️',
  'windy': '💨', 'windy-variant': '🌬️',
};

function fmtDateShort(d: Date): string {
  const today = new Date(); today.setHours(0,0,0,0);
  const tmr = new Date(today); tmr.setDate(today.getDate() + 1);
  const day = new Date(d); day.setHours(0,0,0,0);
  if (day.getTime() === today.getTime()) return 'Heute';
  if (day.getTime() === tmr.getTime()) return 'Morgen';
  const diff = Math.round((day.getTime() - today.getTime()) / 86400000);
  if (diff > 0 && diff <= 6) return `+${diff}d`;
  return d.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric' });
}

function fmtTrashEntity(state: string, attrs: Record<string, unknown>): string | null {
  const INVALID = ['off', 'on', 'unavailable', 'unknown', 'none', ''];
  if (!state) return null;

  // state is "on" → event is happening today
  if (state === 'on') return 'Heute';

  // state is "off" or binary → check start_time attribute for next event
  if (INVALID.includes(state.toLowerCase())) {
    const startTime = attrs['start_time'] as string | undefined;
    if (startTime) {
      const d = new Date(startTime);
      if (!isNaN(d.getTime())) return fmtDateShort(d);
    }
    return null;
  }

  // state is a number (days until pickup)
  const days = parseInt(state, 10);
  if (!isNaN(days) && String(days) === state.trim()) {
    if (days === 0) return 'Heute';
    if (days === 1) return 'Morgen';
    return `+${days}d`;
  }

  // state is an ISO date string
  const d = new Date(state);
  if (!isNaN(d.getTime())) return fmtDateShort(d);

  return null;
}

@customElement('nspanel-status-bar')
export class NspanelStatusBar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _time = '';
  @state() private _date = '';
  private _timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._timer = window.setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  private _tick() {
    const now = new Date();
    this._time = now.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
    this._date = now.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;
    const weather = c.weather_entity ? h?.states[c.weather_entity] : null;
    const trash   = c.trash_entity   ? h?.states[c.trash_entity]   : null;
    const temp      = weather?.attributes['temperature'] as number | undefined;
    const icon      = weather ? (WEATHER_ICON[weather.state] ?? '🌡️') : null;
    const trashText = trash ? fmtTrashEntity(trash.state, trash.attributes) : null;

    return html`
      <div class="bar ${this.dark ? 'nsp-dark' : ''}">
        <div class="left">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${icon ? html`<span class="chip">${icon}${temp != null ? ` ${Math.round(temp)}°` : ''}</span>` : ''}
          ${trashText ? html`<span class="chip">🗑️ ${trashText}</span>` : ''}
        </div>
      </div>
    `;
  }

  static styles = [tokens, css`
    .bar {
      height: 34px;
      padding: 0 var(--nsp-s4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      background: var(--nsp-bg);
      border-bottom: 0.5px solid var(--nsp-separator);
    }
    .left {
      display: flex;
      align-items: baseline;
      gap: 7px;
    }
    .time {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: var(--nsp-text-1);
    }
    .date {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-2);
    }
    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chip {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-2);
    }
  `];
}
