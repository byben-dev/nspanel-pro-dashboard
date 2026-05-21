import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NspanelConfig, PageId } from './types';

const DEFAULTS: Record<PageId, string> = {
  home: 'Home', climate: 'Climate', blinds: 'Blinds', media: 'Media', energy: 'Energy', security: 'Security',
};

const ALL_PAGES: { id: PageId }[] = [
  { id: 'home' }, { id: 'climate' }, { id: 'blinds' }, { id: 'media' }, { id: 'energy' }, { id: 'security' },
];

// ── Home ─────────────────────────────────────────────────────────────────────

const S_HOME_STATUS = [
  { name: 'weather_entity',  label: 'Weather',           selector: { entity: { domain: 'weather' } } },
  { name: 'calendar_entity', label: 'Calendar',           selector: { entity: { domain: 'calendar' } } },
  { name: 'trash_entity',    label: 'Trash Collection',   selector: { entity: { domain: ['sensor', 'calendar'] } } },
];

const S_HOME_PRESENCE = [
  { name: 'person_1', label: 'Person 1 — shown as 👦 in status bar', selector: { entity: { domain: 'person' } } },
  { name: 'person_2', label: 'Person 2 — shown as 👧 in status bar', selector: { entity: { domain: 'person' } } },
];

const S_HOME_LIGHTS = [
  { name: 'garden_light',      label: 'Light 1',                          selector: { entity: { domain: ['light', 'switch'] } } },
  { name: 'garden_light_icon', label: 'Light 1 Icon — emoji, default 💡', selector: { text: {} } },
  { name: 'light_2',           label: 'Light 2 (optional)',                selector: { entity: { domain: ['light', 'switch'] } } },
  { name: 'light_2_icon',      label: 'Light 2 Icon — emoji, default 💡', selector: { text: {} } },
];

const S_HOME_APPLIANCES = [
  { name: 'vacuum_entity',     label: 'Robot Vacuum (optional)',                              selector: { entity: { domain: 'vacuum' } } },
  { name: 'dishwasher_entity', label: 'Dishwasher (optional) — remaining time sensor in min', selector: { entity: { domain: 'sensor' } } },
];

// ── Climate ───────────────────────────────────────────────────────────────────

const S_CLIMATE = [
  { name: 'thermostat_entity', label: 'Thermostat', selector: { entity: { domain: 'climate' } } },
];

// ── Blinds ────────────────────────────────────────────────────────────────────

const S_BLINDS_MAIN = [
  { name: 'cover_1', label: 'Blind 1',           selector: { entity: { domain: 'cover' } } },
  { name: 'cover_2', label: 'Blind 2 (optional)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_3', label: 'Blind 3 (optional)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_4', label: 'Blind 4 (optional)', selector: { entity: { domain: 'cover' } } },
];

const S_BLINDS_MORE = [
  { name: 'cover_5', label: 'Blind 5', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_6', label: 'Blind 6', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_7', label: 'Blind 7', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_8', label: 'Blind 8', selector: { entity: { domain: 'cover' } } },
];

const S_BLINDS_SCENES = [
  { name: 'scene_up',   label: 'Open All — scene or script',  selector: { entity: { domain: ['scene', 'script'] } } },
  { name: 'scene_down', label: 'Close All — scene or script', selector: { entity: { domain: ['scene', 'script'] } } },
];

// ── Media ─────────────────────────────────────────────────────────────────────

const S_MEDIA = [
  { name: 'media_player',        label: 'Media Player',                                          selector: { entity: { domain: 'media_player' } } },
  { name: 'media_default_source', label: 'Default Source (optional) — e.g. Spotify, Bluetooth', selector: { text: {} } },
];

// ── Energy ────────────────────────────────────────────────────────────────────

const S_ENERGY_MAIN = [
  { name: 'pv_entity',   label: 'Solar Production — sensor in W or kW',                          selector: { entity: { domain: 'sensor' } } },
  { name: 'grid_entity', label: 'Grid Power — positive = import, negative = export (W or kW)',    selector: { entity: { domain: 'sensor' } } },
  { name: 'ev_entity',       label: 'EV Battery (optional) — state of charge sensor in %', selector: { entity: { domain: 'sensor' } } },
  { name: 'ev_range_entity', label: 'EV Range (optional) — range sensor in km',           selector: { entity: { domain: 'sensor' } } },
];

const S_ENERGY_FORECAST = [
  { name: 'pv_today_entity',          label: 'Solar Energy Today — sensor in kWh',         selector: { entity: { domain: 'sensor' } } },
  { name: 'forecast_today_entity',    label: 'Solar Forecast Today — sensor in kWh',       selector: { entity: { domain: 'sensor' } } },
  { name: 'forecast_tomorrow_entity', label: 'Solar Forecast Tomorrow — sensor in kWh',    selector: { entity: { domain: 'sensor' } } },
];

// ── Security ──────────────────────────────────────────────────────────────────

const S_SECURITY = [
  { name: 'camera_1', label: 'Camera 1',           selector: { entity: { domain: 'camera' } } },
  { name: 'camera_2', label: 'Camera 2 (optional)', selector: { entity: { domain: 'camera' } } },
  { name: 'camera_3', label: 'Camera 3 (optional)', selector: { entity: { domain: 'camera' } } },
  { name: 'camera_4', label: 'Camera 4 (optional)', selector: { entity: { domain: 'camera' } } },
];

// ── Doorbell ──────────────────────────────────────────────────────────────────

const S_DOORBELL = [
  { name: 'doorbell_trigger', label: 'Doorbell Trigger — binary_sensor or input_boolean', selector: { entity: { domain: ['binary_sensor', 'input_boolean'] } } },
  { name: 'doorbell_camera',  label: 'Doorbell Camera (optional)',                        selector: { entity: { domain: 'camera' } } },
];

// ── Appearance ────────────────────────────────────────────────────────────────

const S_APPEARANCE = [
  { name: 'bg_accent_1', label: 'Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)',   selector: { text: {} } },
  { name: 'bg_accent_2', label: 'Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)', selector: { text: {} } },
];

const LABEL = (s: { label?: string; name: string }) => s.label ?? s.name;

@customElement('nspanel-dashboard-editor')
export class NspanelDashboardEditor extends LitElement {
  @property({ attribute: false }) hass?: unknown;
  @state() private _config!: NspanelConfig;

  createRenderRoot() { return this; }

  setConfig(config: NspanelConfig) { this._config = config; }

  private _merge(e: CustomEvent) {
    this._config = { ...this._config, ...e.detail.value };
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  private _togglePage(id: PageId) {
    const pages = [...(this._config.pages ?? ['home'])];
    const idx = pages.indexOf(id);
    if (idx >= 0) { if (pages.length > 1) pages.splice(idx, 1); }
    else pages.push(id);
    this._config = { ...this._config, pages };
    this._emit();
  }

  private _setPortrait(val: boolean) {
    this._config = { ...this._config, cameras_portrait: val };
    this._emit();
  }

  private _form(schema: object[]) {
    return html`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${schema}
        .computeLabel=${LABEL} @value-changed=${this._merge}></ha-form>
    `;
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;
    const pages = c.pages ?? ['home'];
    const customLabel = (id: PageId) => (c[`${id}_label` as keyof NspanelConfig] as string | undefined) ?? '';

    return html`
      <style>
        .nsp-sec {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; color: var(--secondary-text-color);
          margin: 24px 0 2px; padding-bottom: 6px;
          border-bottom: 1px solid var(--divider-color);
        }
        .nsp-sec:first-child { margin-top: 8px; }
        .nsp-desc {
          font-size: 13px; color: var(--secondary-text-color);
          margin: 4px 0 8px; line-height: 1.4;
        }
        .nsp-group {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: .05em; color: var(--secondary-text-color);
          margin: 12px 0 0; opacity: .7;
        }
        .nsp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .nsp-chip {
          padding: 6px 16px; border-radius: 980px;
          border: 1.5px solid var(--divider-color);
          background: none; cursor: pointer;
          font-size: 13px; color: var(--primary-text-color);
          transition: all .15s;
        }
        .nsp-chip.active {
          border-color: var(--primary-color);
          background: var(--primary-color); color: white;
        }
        .nsp-details {
          margin: 6px 0 0; border-radius: 8px;
          border: 1px solid var(--divider-color); overflow: hidden;
        }
        .nsp-details summary {
          padding: 10px 12px; cursor: pointer; font-size: 13px;
          color: var(--secondary-text-color); list-style: none;
          display: flex; align-items: center; gap: 8px;
          user-select: none;
        }
        .nsp-details summary::before {
          content: '▶'; font-size: 9px; transition: transform .2s;
          flex-shrink: 0;
        }
        .nsp-details[open] summary::before { transform: rotate(90deg); }
        .nsp-details-body { padding: 0 12px 12px; }
        .nsp-toggle-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-top: 1px solid var(--divider-color); margin-top: 4px;
        }
        .nsp-toggle-label { font-size: 14px; color: var(--primary-text-color); }
        .nsp-toggle-hint  { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
        .nsp-hint {
          font-size: 12px; color: var(--secondary-text-color);
          margin: 2px 0 8px; padding: 6px 10px;
          background: var(--secondary-background-color);
          border-radius: 6px; line-height: 1.4;
        }
        .nsp-hint code { font-size: 11px; background: var(--divider-color); padding: 1px 4px; border-radius: 3px; }
      </style>

      <!-- ── Pages ── -->
      <div class="nsp-sec">Pages</div>
      <p class="nsp-desc">Select which tabs appear on the panel. At least one must be active.</p>
      <div class="nsp-chips">
        ${ALL_PAGES.map(p => html`
          <button class="nsp-chip ${pages.includes(p.id) ? 'active' : ''}"
            @click=${() => this._togglePage(p.id)}>
            ${customLabel(p.id) || DEFAULTS[p.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(ALL_PAGES.map(p => ({
            name: `${p.id}_label`,
            label: `${DEFAULTS[p.id]} — custom label`,
            selector: { text: {} },
          })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Weather, calendar events, lights and appliances shown on the Home tab.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(S_HOME_STATUS)}
      <details class="nsp-details">
        <summary>Trash category colors</summary>
        <div class="nsp-details-body">
          <p class="nsp-hint">
            One category per line: <code>keyword,keyword2=🔴</code><br>
            Leave empty for defaults: paper=🔴 · yellow bag=🟡 · residual=⚫
          </p>
          ${this._form([{
            name: 'trash_mapping',
            label: 'Custom mapping (leave empty for defaults)',
            selector: { text: { multiline: true } },
          }])}
        </div>
      </details>

      <div class="nsp-group">Presence</div>
      ${this._form(S_HOME_PRESENCE)}

      <div class="nsp-group">Lights</div>
      ${this._form(S_HOME_LIGHTS)}

      <div class="nsp-group">Appliances</div>
      ${this._form(S_HOME_APPLIANCES)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Control your heating and cooling system.</p>
      ${this._form(S_CLIMATE)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(S_BLINDS_MAIN)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(S_BLINDS_MORE)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(S_BLINDS_SCENES)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(S_MEDIA)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(S_ENERGY_MAIN)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(S_ENERGY_FORECAST)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(S_SECURITY)}
      <div class="nsp-toggle-row">
        <div>
          <div class="nsp-toggle-label">Portrait Mode (9:16)</div>
          <div class="nsp-toggle-hint">Enable for vertical / doorbell cameras</div>
        </div>
        <ha-switch
          ?checked=${!!c.cameras_portrait}
          @change=${(e: Event) => this._setPortrait((e.target as HTMLInputElement).checked)}
        ></ha-switch>
      </div>

      <!-- ── Doorbell ── -->
      <div class="nsp-sec">Doorbell</div>
      <p class="nsp-desc">Shows a live camera popup when someone rings the bell.</p>
      ${this._form(S_DOORBELL)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(S_APPEARANCE)}
    `;
  }
}
