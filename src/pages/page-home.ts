import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, HassEntity, NspanelConfig, CalendarEvent } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function fmtEventTime(e: CalendarEvent): string {
  if (e.start.date) return 'Ganztag';
  const d = new Date(e.start.dateTime!);
  return d.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
}

const VACUUM_LABEL: Record<string, string> = {
  cleaning: 'Saugt', returning: 'Kehrt zurück',
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

  private _adjustTemp(delta: number) {
    const entity = this.config?.thermostat_entity;
    if (!entity || !this.hass) return;
    const curr = this.hass.states[entity]?.attributes['temperature'] as number | undefined;
    if (curr == null) return;
    // Snap to 0.5° steps
    this.hass.callService('climate', 'set_temperature', {
      entity_id: entity,
      temperature: Math.round((curr + delta) * 2) / 2,
    });
  }

  render() {
    const c = this.config ?? {};
    const h = this.hass;

    const l1E   = c.garden_light      ? h?.states[c.garden_light]      : null;
    const l2E   = c.light_2           ? h?.states[c.light_2]           : null;
    const vacE  = c.vacuum_entity     ? h?.states[c.vacuum_entity]     : null;
    const dishE = c.dishwasher_entity ? h?.states[c.dishwasher_entity] : null;
    const dishRem = dishE ? (parseFloat(dishE.state) || 0) : 0;
    const dishPct = (dishRem > 0 && this._dishMax > 0)
      ? Math.round(Math.max(0, Math.min((1 - dishRem / this._dishMax) * 100, 100))) : 0;

    // Temperature: prefer indoor_temp_entity, fall back to thermostat current_temperature
    const indoorE  = c.indoor_temp_entity ? h?.states[c.indoor_temp_entity] : null;
    const thermoE  = c.thermostat_entity  ? h?.states[c.thermostat_entity]  : null;
    const indoorTemp = indoorE
      ? parseFloat(indoorE.state)
      : thermoE
        ? (thermoE.attributes['current_temperature'] as number | undefined) ?? null
        : null;
    const targetTemp = thermoE
      ? (thermoE.attributes['temperature'] as number | undefined) ?? null
      : null;
    const showTempCard = indoorTemp != null || targetTemp != null;

    // EV
    const evE        = c.ev_entity       ? h?.states[c.ev_entity]       : null;
    const evRangeE   = c.ev_range_entity ? h?.states[c.ev_range_entity] : null;
    const evRaw      = evE      ? parseFloat(evE.state)      : NaN;
    const ev         = isNaN(evRaw) ? null : evRaw;
    const evRangeRaw = evRangeE ? parseFloat(evRangeE.state) : NaN;
    const evRange    = isNaN(evRangeRaw) ? null : Math.round(evRangeRaw);

    // Filter out past timed events
    const now = new Date();
    const events = this._calEvents.filter(e => {
      if (e.start.date) return true;
      const end = e.end.dateTime ? new Date(e.end.dateTime) : new Date(e.start.dateTime!);
      return end > now;
    });

    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">

        <div class="main-grid">

          <!-- Left: Calendar -->
          <div class="cal-card">
            <div class="cal-header">Heute</div>
            <div class="cal-list">
              ${events.length > 0
                ? events.map(e => html`
                  <div class="cal-event">
                    <div class="cal-dot"></div>
                    <div class="cal-body">
                      <div class="cal-title">${e.summary}</div>
                      <div class="cal-time">${fmtEventTime(e)}</div>
                    </div>
                  </div>
                `)
                : html`<div class="cal-empty">Keine weiteren Termine</div>`
              }
            </div>
          </div>

          <!-- Right: Controls -->
          <div class="controls-col">

            <!-- Temperature + threshold -->
            ${showTempCard ? html`
              <div class="temp-card">
                <div class="temp-label">INNENRAUM</div>
                ${indoorTemp != null ? html`
                  <div class="temp-current">${(Math.round(indoorTemp * 10) / 10).toFixed(1)}°</div>
                ` : ''}
                ${targetTemp != null ? html`
                  <div class="temp-divider"></div>
                  <div class="temp-stepper">
                    <button class="step-btn" @click=${() => this._adjustTemp(-0.5)}>−</button>
                    <span class="step-val">${targetTemp.toFixed(1)}°</span>
                    <button class="step-btn" @click=${() => this._adjustTemp(0.5)}>+</button>
                  </div>
                  <div class="temp-hint">Heizgrenze</div>
                ` : ''}
              </div>
            ` : ''}

            ${l1E ? this._renderLight(c.garden_light!, l1E, c.garden_light_icon ?? '💡') : ''}
            ${l2E ? this._renderLight(c.light_2!, l2E, c.light_2_icon ?? '💡') : ''}

            ${vacE ? html`
              <button class="ctrl-btn vac-btn ${vacE.state === 'cleaning' ? 'active' : ''}"
                @click=${() => this._vacuumAction(c.vacuum_entity!, vacE.state)}>
                <span class="ctrl-icon">🤖</span>
                <span class="ctrl-name">${VACUUM_LABEL[vacE.state] ?? vacE.state}</span>
                ${vacE.state !== 'error' && vacE.state !== 'returning' ? html`
                  <div class="vac-action ${vacE.state === 'cleaning' || vacE.state === 'paused' ? 'stop' : 'start'}">
                    ${vacE.state === 'cleaning' || vacE.state === 'paused'
                      ? html`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 6h12v12H6z"/></svg>`
                      : html`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>`}
                  </div>
                ` : ''}
              </button>
            ` : ''}

            ${dishRem > 0 ? html`
              <div class="ctrl-btn dish-btn">
                <span class="ctrl-icon">🍽️</span>
                <div class="dish-track">
                  <div class="dish-fill" style="width:${dishPct}%"></div>
                </div>
                <span class="dish-time">${Math.round(dishRem)} min</span>
              </div>
            ` : ''}

          </div>
        </div>

        <!-- EV bar: full width, only when connected -->
        ${ev != null ? html`
          <div class="ev-bar">
            <span class="ev-label">🚗 ${Math.round(ev)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${ev}%"></div></div>
            ${evRange != null ? html`<span class="ev-km">${evRange} km</span>` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  private _renderLight(entity: string, e: HassEntity, icon: string) {
    const isOn = e.state === 'on';
    const name = (e.attributes['friendly_name'] as string) ?? entity.split('.')[1];
    return html`
      <button class="ctrl-btn" @click=${() => this._toggleLight(entity)}>
        <span class="ctrl-icon">${icon}</span>
        <span class="ctrl-name">${name}</span>
        <div class="toggle-track ${isOn ? 'on' : ''}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page { gap: var(--nsp-s2); }

    /* ── 50/50 grid ── */
    .main-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
      min-height: 0;
    }

    /* ── Calendar ── */
    .cal-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      min-height: 0;
      overflow: hidden;
    }
    .cal-header {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
      flex-shrink: 0;
    }
    .cal-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 0;
    }
    .cal-event {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      flex-shrink: 0;
    }
    .cal-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--nsp-accent);
      margin-top: 5px;
      flex-shrink: 0;
    }
    .cal-body { min-width: 0; }
    .cal-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cal-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 1px;
    }
    .cal-empty {
      flex: 1;
      display: flex;
      align-items: center;
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
    }

    /* ── Controls column ── */
    .controls-col {
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      min-height: 0;
    }

    /* ── Temperature card ── */
    .temp-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 10px var(--nsp-s3) 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }
    .temp-label {
      font-family: var(--nsp-font);
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--nsp-text-3);
      align-self: flex-start;
    }
    .temp-current {
      font-family: var(--nsp-font);
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .temp-divider {
      width: 100%;
      height: 1px;
      background: var(--nsp-surface-3);
      margin: 4px 0 2px;
    }
    .temp-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 4px;
    }
    .step-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: var(--nsp-surface-3);
      font-family: var(--nsp-font);
      font-size: 20px;
      font-weight: 300;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 1;
    }
    .step-btn:active { background: var(--nsp-accent); color: white; }
    .step-val {
      font-family: var(--nsp-font);
      font-size: 16px;
      font-weight: 700;
      color: var(--nsp-text-1);
      text-align: center;
      flex: 1;
    }
    .temp-hint {
      font-family: var(--nsp-font);
      font-size: 9px;
      color: var(--nsp-text-3);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }

    /* ── Generic control button ── */
    .ctrl-btn {
      width: 100%;
      box-sizing: border-box;
      height: 44px;
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
      gap: 6px;
      padding: 0 var(--nsp-s2);
      flex-shrink: 0;
    }
    .ctrl-btn:not(.dish-btn):active { opacity: 0.7; }
    .ctrl-icon { font-size: 14px; flex-shrink: 0; }
    .ctrl-name {
      flex: 1;
      font-size: 11px;
      font-weight: 500;
      color: var(--nsp-text-1);
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .toggle-track {
      width: 36px;
      height: 22px;
      border-radius: 11px;
      background: var(--nsp-surface-3);
      position: relative;
      flex-shrink: 0;
      transition: background 0.25s;
    }
    .toggle-track.on { background: var(--nsp-green); }
    .toggle-knob {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.25s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .toggle-track.on .toggle-knob { transform: translateX(14px); }

    .vac-btn.active {
      background: rgba(48,209,88,0.12);
      border-color: rgba(48,209,88,0.3);
    }
    .vac-action {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .vac-action.start { background: var(--nsp-green);  color: white; }
    .vac-action.stop  { background: var(--nsp-orange); color: white; }

    .dish-btn { cursor: default; }
    .dish-track {
      flex: 1;
      height: 3px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .dish-fill {
      height: 100%;
      background: var(--nsp-teal);
      border-radius: 2px;
    }
    .dish-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      flex-shrink: 0;
    }

    /* ── EV bar ── */
    .ev-bar {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      height: 36px;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      flex-shrink: 0;
    }
    .ev-label {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-track {
      flex: 1;
      height: 5px;
      background: var(--nsp-surface-3);
      border-radius: 3px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 3px;
    }
    .ev-km {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      white-space: nowrap;
      flex-shrink: 0;
    }
  `];
}
