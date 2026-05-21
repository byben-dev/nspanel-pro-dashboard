import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig, CalendarEvent } from '../types';
import { tokens } from '../styles/tokens';

const WEATHER_ICON: Record<string, string> = {
  'sunny': '☀️', 'clear-night': '🌙', 'partlycloudy': '⛅',
  'cloudy': '☁️', 'fog': '🌫️', 'rainy': '🌦️', 'pouring': '🌧️',
  'snowy': '❄️', 'snowy-rainy': '🌨️', 'hail': '🌨️',
  'lightning': '⚡', 'lightning-rainy': '⛈️',
  'windy': '💨', 'windy-variant': '🌬️',
};

const DEFAULT_TRASH_MAPPING = `papier,altpapier=🔴\ngelb,gelber sack=🟡\nrest,sperrmüll,sperr=⚫\nbio,bioabfall=🟤\nglas=🟢`;

function parseTrashMapping(raw: string): Array<{ keywords: string[]; icon: string }> {
  return raw.trim().split('\n')
    .map(l => l.trim())
    .filter(l => l && l.includes('='))
    .map(l => {
      const eq = l.lastIndexOf('=');
      const keywords = l.slice(0, eq).split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
      const icon = l.slice(eq + 1).trim() || '🗑️';
      return { keywords, icon };
    });
}

function trashIcon(summary: string, mapping?: string): string {
  const rules = parseTrashMapping(mapping ?? DEFAULT_TRASH_MAPPING);
  const s = summary.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some(k => s.includes(k))) return rule.icon;
  }
  return '🗑️';
}

function dayLabel(d: Date): string {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tmr   = new Date(today); tmr.setDate(today.getDate() + 1);
  const day   = new Date(d);    day.setHours(0, 0, 0, 0);
  if (day.getTime() === today.getTime()) return 'Heute';
  if (day.getTime() === tmr.getTime())   return 'Morgen';
  const diff = Math.round((day.getTime() - today.getTime()) / 86400000);
  if (diff > 0 && diff <= 6) return d.toLocaleDateString('de-AT', { weekday: 'short' });
  return `+${diff}d`;
}

@customElement('nspanel-status-bar')
export class NspanelStatusBar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _time = '';
  @state() private _date = '';
  @state() private _trashChip: string | null = null;

  private _clockTimer?: number;
  private _trashTimer?: number;
  private _trashFetched = false;

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._clockTimer = window.setInterval(() => this._tick(), 1000);
    this._trashTimer = window.setInterval(() => this._fetchTrash(), 30 * 60 * 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._clockTimer);
    clearInterval(this._trashTimer);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('hass') && this.hass && !this._trashFetched && this.config?.trash_entity) {
      this._trashFetched = true;
      this._fetchTrash();
    }
  }

  private _tick() {
    const now = new Date();
    this._time = now.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
    this._date = now.toLocaleDateString('de-AT', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  private _presenceChip() {
    const c = this.config ?? {};
    const h = this.hass;
    const p1 = c.person_1 ? h?.states[c.person_1]?.state === 'home' : false;
    const p2 = c.person_2 ? h?.states[c.person_2]?.state === 'home' : false;
    const icons = [p1 ? '👨🏻' : '', p2 ? '👩🏻' : ''].filter(Boolean).join('');
    return icons ? html`<span class="chip">${icons}</span>` : '';
  }

  private async _fetchTrash() {
    const entity = this.config?.trash_entity;
    if (!entity || !this.hass) return;

    // Try calendar REST API — returns all events in range, allows showing multiple categories
    try {
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const end   = new Date(start); end.setDate(end.getDate() + 14);
      const resp  = await this.hass.fetchWithAuth(
        `/api/calendars/${entity}?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`
      );
      if (resp.ok) {
        const events: CalendarEvent[] = await resp.json();
        if (events.length > 0) {
          // Group events by their calendar date, find the nearest day
          const byDate = new Map<string, string[]>();
          for (const e of events) {
            const raw = e.start.date ?? e.start.dateTime ?? '';
            const d = new Date(raw);
            if (isNaN(d.getTime())) continue;
            d.setHours(0, 0, 0, 0);
            const key = d.toISOString();
            if (!byDate.has(key)) byDate.set(key, []);
            byDate.get(key)!.push(e.summary);
          }
          const [nearestKey, summaries] = [...byDate.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]))[0];
          const m = this.config?.trash_mapping;
          const icons = [...new Set(summaries.map(s => trashIcon(s, m)))].join('');
          this._trashChip = `${icons} ${dayLabel(new Date(nearestKey))}`;
          return;
        }
        this._trashChip = null;
        return;
      }
    } catch { /* fall through to entity-state fallback */ }

    // Fallback: read entity state + attributes
    const trash = this.hass.states[entity];
    if (!trash) return;

    const m = this.config?.trash_mapping;
    if (trash.state === 'on') {
      const msg = trash.attributes['message'] as string | undefined;
      this._trashChip = `${msg ? trashIcon(msg, m) : '🗑️'} Heute`;
      return;
    }

    const BINARY = ['off', 'unavailable', 'unknown', 'none', ''];
    if (BINARY.includes(trash.state.toLowerCase())) {
      const startTime = trash.attributes['start_time'] as string | undefined;
      const msg       = trash.attributes['message']    as string | undefined;
      if (startTime) {
        const d = new Date(startTime);
        if (!isNaN(d.getTime())) {
          this._trashChip = `${msg ? trashIcon(msg, m) : '🗑️'} ${dayLabel(d)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }

    // state = number of days
    const days = parseInt(trash.state, 10);
    if (!isNaN(days) && String(days) === trash.state.trim()) {
      const msg = trash.attributes['message'] as string | undefined;
      const lbl = days === 0 ? 'Heute' : days === 1 ? 'Morgen' : `+${days}d`;
      this._trashChip = `${msg ? trashIcon(msg, m) : '🗑️'} ${lbl}`;
      return;
    }

    // state = ISO date
    const d = new Date(trash.state);
    if (!isNaN(d.getTime())) {
      this._trashChip = `🗑️ ${dayLabel(d)}`;
    }
  }

  render() {
    const c    = this.config ?? {};
    const h    = this.hass;
    const weather = c.weather_entity ? h?.states[c.weather_entity] : null;
    const temp    = weather?.attributes['temperature'] as number | undefined;
    const wIcon   = weather ? (WEATHER_ICON[weather.state] ?? '🌡️') : null;

    return html`
      <div class="bar ${this.dark ? 'nsp-dark' : ''}">
        <div class="left">${this._presenceChip()}</div>
        <div class="center">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${wIcon ? html`<span class="chip">${wIcon}${temp != null ? ` ${Math.round(temp)}°` : ''}</span>` : ''}
          ${this._trashChip ? html`<span class="chip">${this._trashChip}</span>` : ''}
        </div>
      </div>
    `;
  }

  static styles = [tokens, css`
    .bar {
      height: 38px;
      padding: 0 var(--nsp-s3);
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      flex-shrink: 0;
      background: var(--nsp-bg-secondary);
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .center {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
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
    .chip {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
    }
  `];
}
