import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, HassEntity, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function weatherIcon(condition: string): string {
  const m: Record<string, string> = {
    'sunny': '☀️', 'clear-night': '🌙', 'partlycloudy': '⛅',
    'cloudy': '☁️', 'fog': '🌫️', 'hail': '🌨️',
    'lightning': '⚡', 'lightning-rainy': '⛈️', 'pouring': '🌧️',
    'rainy': '🌦️', 'snowy': '❄️', 'snowy-rainy': '🌨️',
    'windy': '💨', 'windy-variant': '🌬️', 'exceptional': '⚠️',
  };
  return m[condition] ?? '🌡️';
}

function fmtTime(dt: string): string {
  try { return new Date(dt).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' }); }
  catch { return dt; }
}

function fmtTrash(s: string): string {
  const days = parseInt(s, 10);
  if (!isNaN(days) && String(days) === s.trim()) {
    if (days === 0) return 'Heute';
    if (days === 1) return 'Morgen';
    return `in ${days} Tagen`;
  }
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const today = new Date();
    const tmr = new Date(today); tmr.setDate(today.getDate() + 1);
    if (d.toDateString() === today.toDateString()) return 'Heute';
    if (d.toDateString() === tmr.toDateString()) return 'Morgen';
    return d.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  return s;
}

@customElement('nspanel-page-home')
export class NspanelPageHome extends LitElement {
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
    this._date = now.toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;
    const weather  = c.weather_entity  ? h?.states[c.weather_entity]  : null;
    const calendar = c.calendar_entity ? h?.states[c.calendar_entity] : null;
    const trash    = c.trash_entity    ? h?.states[c.trash_entity]    : null;
    const p1       = c.person_1        ? h?.states[c.person_1]        : null;
    const p2       = c.person_2        ? h?.states[c.person_2]        : null;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        <div class="clock-block">
          <div class="time">${this._time}</div>
          <div class="date">${this._date}</div>
        </div>

        ${weather ? this._renderWeather(weather) : ''}

        ${(calendar || trash) ? html`
          <div class="info-row">
            ${calendar ? this._renderCalendar(calendar) : ''}
            ${trash    ? this._renderTrash(trash)       : ''}
          </div>
        ` : ''}

        ${(p1 || p2) ? html`
          <div class="persons-row">
            ${p1 ? this._renderPerson(p1) : ''}
            ${p2 ? this._renderPerson(p2) : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderWeather(w: HassEntity) {
    const temp = w.attributes['temperature'] as number | undefined;
    const forecast = (w.attributes['forecast'] as Record<string, unknown>[] | undefined) ?? [];
    const tmr = forecast[0];
    return html`
      <div class="card weather-card">
        <div class="weather-main">
          <span class="weather-icon">${weatherIcon(w.state)}</span>
          <span class="weather-temp">${temp != null ? `${Math.round(temp)}°` : '–'}</span>
          <span class="weather-cond">${w.state.replace(/-/g, ' ')}</span>
        </div>
        ${tmr ? html`
          <div class="weather-tmr">
            <span>${weatherIcon(tmr['condition'] as string)}</span>
            <span>↑${Math.round(tmr['temperature'] as number)}°</span>
            ${tmr['templow'] != null ? html`<span>↓${Math.round(tmr['templow'] as number)}°</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderCalendar(cal: HassEntity) {
    const msg    = cal.attributes['message']    as string | undefined;
    const start  = cal.attributes['start_time'] as string | undefined;
    const allDay = cal.attributes['all_day']    as boolean | undefined;
    if (!msg) return html``;
    return html`
      <div class="info-card">
        <div class="info-icon">📅</div>
        <div class="info-content">
          <div class="info-title">${msg}</div>
          <div class="info-sub">${allDay ? 'Ganztag' : (start ? fmtTime(start) : '')}</div>
        </div>
      </div>
    `;
  }

  private _renderTrash(sensor: HassEntity) {
    const name = sensor.attributes['friendly_name'] as string ?? 'Müll';
    return html`
      <div class="info-card">
        <div class="info-icon">🗑️</div>
        <div class="info-content">
          <div class="info-title">${fmtTrash(sensor.state)}</div>
          <div class="info-sub">${name}</div>
        </div>
      </div>
    `;
  }

  private _renderPerson(p: HassEntity) {
    const fullName = p.attributes['friendly_name'] as string ?? p.entity_id;
    const name = fullName.split(' ')[0];
    const isHome = p.state === 'home';
    const picture = p.attributes['entity_picture'] as string | undefined;
    return html`
      <div class="person-chip">
        <div class="person-avatar ${isHome ? 'home' : ''}">
          ${picture
            ? html`<img src="${picture}" alt="${name}" />`
            : html`<span>${name[0]?.toUpperCase() ?? '?'}</span>`}
        </div>
        <div class="person-info">
          <div class="person-name">${name}</div>
          <div class="person-status ${isHome ? 'home' : ''}">
            ${isHome ? '● Zu Hause' : '● Unterwegs'}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .clock-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: var(--nsp-s2);
    }
    .time {
      font-family: var(--nsp-font);
      font-size: 72px;
      font-weight: 300;
      letter-spacing: -0.04em;
      color: var(--nsp-text-1);
      line-height: 1;
    }
    .date {
      font-family: var(--nsp-font);
      font-size: 15px;
      color: var(--nsp-text-2);
      margin-top: 4px;
    }
    .weather-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--nsp-s3) var(--nsp-s4);
    }
    .weather-main { display: flex; align-items: center; gap: var(--nsp-s2); }
    .weather-icon { font-size: 24px; }
    .weather-temp {
      font-family: var(--nsp-font);
      font-size: 26px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }
    .weather-cond {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      text-transform: capitalize;
    }
    .weather-tmr {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
    }
    .info-row { display: flex; gap: var(--nsp-s2); }
    .info-card {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      min-width: 0;
    }
    .info-icon { font-size: 20px; flex-shrink: 0; }
    .info-content { flex: 1; min-width: 0; }
    .info-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-sub {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .persons-row { display: flex; gap: var(--nsp-s2); }
    .person-chip {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
    }
    .person-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--nsp-surface-3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 16px;
      font-weight: 600;
      color: var(--nsp-text-2);
      overflow: hidden;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    .person-avatar.home { border: 2px solid var(--nsp-green); }
    .person-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .person-name {
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }
    .person-status {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }
    .person-status.home { color: var(--nsp-green); }
  `];
}
