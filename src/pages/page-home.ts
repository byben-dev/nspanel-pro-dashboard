import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, HassEntity, NspanelConfig, CalendarEvent } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function fmtEventTime(e: CalendarEvent): string {
  if (e.start.date) return 'Ganztag';
  const start = new Date(e.start.dateTime!);
  const end   = e.end.dateTime ? new Date(e.end.dateTime) : null;
  const fmt   = (d: Date) => d.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start);
}

const VACUUM_LABEL: Record<string, string> = {
  cleaning: 'Saugt gerade', returning: 'Kehrt zurück',
  paused: 'Pausiert', docked: 'Angedockt', idle: 'Bereit', error: 'Fehler',
};

@customElement('nspanel-page-home')
export class NspanelPageHome extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _calEvents: CalendarEvent[] = [];
  @state() private _dishMax = 0;
  private _calFetched = false;
  private _calTimer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._calTimer = window.setInterval(() => this._fetchCalendar(), 15 * 60 * 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._calTimer);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('hass') && this.hass) {
      if (!this._calFetched && this.config?.calendar_entity) {
        this._calFetched = true;
        this._fetchCalendar();
      }
      const de = this.config?.dishwasher_entity;
      if (de) {
        const rem = parseFloat(this.hass.states[de]?.state ?? '0') || 0;
        if (rem > this._dishMax) this._dishMax = rem;
        if (rem === 0) this._dishMax = 0;
      }
    }
  }

  private async _fetchCalendar() {
    const entity = this.config?.calendar_entity;
    if (!entity || !this.hass) return;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end   = new Date(); end.setHours(23, 59, 59, 999);
    const url = `/api/calendars/${entity}?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    try {
      const resp = await this.hass.fetchWithAuth(url);
      if (resp.ok) { this._calEvents = await resp.json(); return; }
    } catch { /* fall through */ }
    try {
      const events = await this.hass.callWS<CalendarEvent[]>({
        type: 'calendar/event/list',
        entity_id: entity,
        start_date_time: start.toISOString(),
        end_date_time: end.toISOString(),
      });
      this._calEvents = events ?? [];
    } catch { this._calEvents = []; }
  }

  private _toggleLight(entity: string) {
    const isOn = this.hass?.states[entity]?.state === 'on';
    this.hass.callService(entity.split('.')[0], isOn ? 'turn_off' : 'turn_on', { entity_id: entity });
  }

  private _vacuumAction(entity: string, st: string) {
    const svc = (st === 'cleaning' || st === 'returning' || st === 'paused')
      ? 'return_to_base' : 'start';
    this.hass.callService('vacuum', svc, { entity_id: entity });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;
    const l1   = c.garden_light    ? h?.states[c.garden_light]    : null;
    const l2   = c.light_2         ? h?.states[c.light_2]         : null;
    const vacE = c.vacuum_entity   ? h?.states[c.vacuum_entity]   : null;
    const dishE = c.dishwasher_entity ? h?.states[c.dishwasher_entity] : null;
    const dishRem = dishE ? (parseFloat(dishE.state) || 0) : 0;
    const dishPct = (dishRem > 0 && this._dishMax > 0)
      ? Math.round(Math.max(0, Math.min((1 - dishRem / this._dishMax) * 100, 100))) : 0;

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">

        ${c.calendar_entity ? html`
          <div class="section-label">Heute</div>
          <div class="events-list">
            ${this._calEvents.length > 0
              ? this._calEvents.map(e => html`
                <div class="event-row">
                  <div class="event-dot"></div>
                  <div class="event-body">
                    <div class="event-title">${e.summary}</div>
                    <div class="event-time">${fmtEventTime(e)}</div>
                  </div>
                </div>
              `)
              : html`<div class="no-events">Keine Termine heute</div>`
            }
          </div>
        ` : html`<div class="spacer"></div>`}

        ${(l1 || l2) ? html`
          <div class="lights-row">
            ${l1 ? this._renderLight(c.garden_light!, l1, c.garden_light_icon ?? '💡') : ''}
            ${l2 ? this._renderLight(c.light_2!, l2, c.light_2_icon ?? '💡') : ''}
          </div>
        ` : ''}

        ${vacE ? html`
          <div class="vacuum-row">
            ${this._renderVacuum(c.vacuum_entity!, vacE)}
          </div>
        ` : ''}

        ${dishRem > 0 ? html`
          <div class="dish-row">
            <span class="dish-icon">🍽️</span>
            <div class="dish-track">
              <div class="dish-fill" style="width:${dishPct}%"></div>
            </div>
            <span class="dish-time">${Math.round(dishRem)} min</span>
          </div>
        ` : ''}

      </div>
    `;
  }

  private _renderLight(entity: string, e: HassEntity, icon: string) {
    const isOn = e.state === 'on';
    const name = (e.attributes['friendly_name'] as string) ?? entity.split('.')[1];
    return html`
      <button class="light-btn" @click=${() => this._toggleLight(entity)}>
        <span class="light-icon">${icon}</span>
        <span class="light-name">${name}</span>
        <div class="toggle-track ${isOn ? 'on' : ''}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }

  private _renderVacuum(entity: string, e: HassEntity) {
    const st = e.state;
    const label = VACUUM_LABEL[st] ?? st;
    const isActive = st === 'cleaning' || st === 'returning' || st === 'paused';
    const canAct   = st !== 'error' && st !== 'returning';
    return html`
      <button class="vacuum-btn ${isActive ? 'active' : ''}"
        @click=${canAct ? () => this._vacuumAction(entity, st) : undefined}
        ?disabled=${!canAct}>
        <span class="vacuum-icon">🤖</span>
        <span class="vacuum-label">${label}</span>
        ${canAct ? html`
          <div class="vacuum-action ${isActive ? 'stop' : 'start'}">${isActive ? '⏹' : '▶'}</div>
        ` : ''}
      </button>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { gap: var(--nsp-s2); }
    .spacer { flex: 1; }

    .section-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      padding: 0 2px;
      flex-shrink: 0;
    }

    .events-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow-y: auto;
      min-height: 0;
    }

    .event-row {
      display: flex;
      align-items: flex-start;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      flex-shrink: 0;
    }

    .event-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--nsp-accent);
      margin-top: 4px;
      flex-shrink: 0;
    }

    .event-body { flex: 1; min-width: 0; }

    .event-title {
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .event-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
    }

    .no-events {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }

    /* Lights */
    .lights-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .light-btn {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
      height: 52px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      padding: 0 var(--nsp-s3);
      text-align: left;
    }
    .light-btn:active { opacity: 0.7; }
    .light-icon { font-size: 18px; flex-shrink: 0; }
    .light-name {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .toggle-track {
      width: 44px;
      height: 26px;
      border-radius: 13px;
      background: var(--nsp-surface-3);
      position: relative;
      flex-shrink: 0;
      transition: background 0.25s;
    }
    .toggle-track.on { background: var(--nsp-green); }
    .toggle-knob {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: white;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.25s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.25);
    }
    .toggle-track.on .toggle-knob { transform: translateX(18px); }

    /* Vacuum */
    .vacuum-row { flex-shrink: 0; }

    .vacuum-btn {
      width: 100%;
      box-sizing: border-box;
      height: 52px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      padding: 0 var(--nsp-s3);
    }
    .vacuum-btn.active {
      background: rgba(48,209,88,0.12);
      border-color: rgba(48,209,88,0.3);
    }
    .vacuum-btn:disabled { opacity: 0.6; cursor: default; }
    .vacuum-btn:not(:disabled):active { opacity: 0.7; }
    .vacuum-icon { font-size: 18px; flex-shrink: 0; }
    .vacuum-label {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      text-align: left;
    }
    .vacuum-action {
      width: 32px;
      height: 32px;
      border-radius: var(--nsp-r1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      flex-shrink: 0;
    }
    .vacuum-action.start { background: var(--nsp-green); color: white; }
    .vacuum-action.stop  { background: var(--nsp-red);   color: white; }

    /* Dishwasher */
    .dish-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      height: 52px;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      flex-shrink: 0;
    }
    .dish-icon { font-size: 16px; flex-shrink: 0; }
    .dish-track {
      flex: 1;
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .dish-fill {
      height: 100%;
      background: var(--nsp-teal);
      border-radius: 2px;
      transition: width 1s linear;
    }
    .dish-time {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      flex-shrink: 0;
      min-width: 36px;
      text-align: right;
    }
  `];
}
