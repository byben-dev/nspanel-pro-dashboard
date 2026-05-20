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

@customElement('nspanel-page-home')
export class NspanelPageHome extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _calEvents: CalendarEvent[] = [];
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
    if (changed.has('hass') && this.hass && !this._calFetched && this.config?.calendar_entity) {
      this._calFetched = true;
      this._fetchCalendar();
    }
  }

  private async _fetchCalendar() {
    const entity = this.config?.calendar_entity;
    if (!entity || !this.hass) return;
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end   = new Date(); end.setHours(23, 59, 59, 999);
    try {
      const events = await this.hass.callWS<CalendarEvent[]>({
        type: 'calendar/event/list',
        entity_id: entity,
        start_date_time: start.toISOString(),
        end_date_time: end.toISOString(),
      });
      this._calEvents = events ?? [];
    } catch {
      this._calEvents = [];
    }
  }

  private _toggleLight(entity: string) {
    const isOn = this.hass?.states[entity]?.state === 'on';
    const domain = entity.split('.')[0];
    this.hass.callService(domain, isOn ? 'turn_off' : 'turn_on', { entity_id: entity });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;
    const p1 = c.person_1    ? h?.states[c.person_1]    : null;
    const p2 = c.person_2    ? h?.states[c.person_2]    : null;
    const l1 = c.garden_light ? h?.states[c.garden_light] : null;
    const l2 = c.light_2     ? h?.states[c.light_2]     : null;

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

        ${(p1 || p2) ? html`
          <div class="persons-row">
            ${p1 ? this._renderPerson(c.person_1!, p1) : ''}
            ${p2 ? this._renderPerson(c.person_2!, p2) : ''}
          </div>
        ` : ''}

        ${(l1 || l2) ? html`
          <div class="lights-row">
            ${l1 ? this._renderLight(c.garden_light!, l1) : ''}
            ${l2 ? this._renderLight(c.light_2!, l2) : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  private _renderPerson(entityId: string, p: HassEntity) {
    const fullName = p.attributes['friendly_name'] as string ?? entityId;
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

  private _renderLight(entity: string, e: HassEntity) {
    const isOn = e.state === 'on';
    const name = (e.attributes['friendly_name'] as string) ?? entity.split('.')[1];
    return html`
      <button class="light-btn ${isOn ? 'on' : ''}" @click=${() => this._toggleLight(entity)}>
        <span class="light-icon">${isOn ? '☀️' : '🌙'}</span>
        <span class="light-name">${name}</span>
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

    .persons-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .person-chip {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
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

    .person-info { flex: 1; min-width: 0; }
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

    .lights-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .light-btn {
      flex: 1;
      height: 48px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--nsp-s1);
    }
    .light-btn.on {
      background: var(--nsp-yellow);
      border-color: transparent;
      box-shadow: none;
      color: #000;
    }
    .light-btn:active { opacity: 0.7; }
    .light-icon { font-size: 16px; }
    .light-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  `];
}
