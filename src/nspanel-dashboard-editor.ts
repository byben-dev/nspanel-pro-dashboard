import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NspanelConfig, PageId } from './types';

const ALL_PAGES: { id: PageId; label: string }[] = [
  { id: 'home',    label: 'Home' },
  { id: 'climate', label: 'Climate' },
  { id: 'blinds',  label: 'Blinds' },
  { id: 'media',   label: 'Media' },
  { id: 'energy',  label: 'Energy' },
];

const S_HOME = [
  { name: 'weather_entity',  label: 'Wetter',           selector: { entity: { domain: 'weather' } } },
  { name: 'calendar_entity', label: 'Kalender',         selector: { entity: { domain: 'calendar' } } },
  { name: 'trash_entity',    label: 'Müllabfuhr',       selector: { entity: { domain: ['sensor','calendar'] } } },
  { name: 'person_1',        label: 'Person 1',         selector: { entity: { domain: 'person' } } },
  { name: 'person_2',        label: 'Person 2',         selector: { entity: { domain: 'person' } } },
];

const S_CLIMATE = [
  { name: 'thermostat_entity', label: 'Thermostat', selector: { entity: { domain: 'climate' } } },
];

const S_BLINDS = [
  { name: 'cover_1', label: 'Jalousie 1', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_2', label: 'Jalousie 2', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_3', label: 'Jalousie 3', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_4', label: 'Jalousie 4', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_5', label: 'Jalousie 5', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_6', label: 'Jalousie 6', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_7', label: 'Jalousie 7', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_8', label: 'Jalousie 8', selector: { entity: { domain: 'cover' } } },
  { name: 'garden_light', label: 'Gartenlicht', selector: { entity: { domain: ['light','switch'] } } },
  { name: 'scene_up',   label: 'Szene: Alle hoch',   selector: { entity: { domain: ['scene','script'] } } },
  { name: 'scene_down', label: 'Szene: Alle runter',  selector: { entity: { domain: ['scene','script'] } } },
];

const S_MEDIA = [
  { name: 'media_player', label: 'Media Player', selector: { entity: { domain: 'media_player' } } },
];

const S_ENERGY = [
  { name: 'pv_entity',   label: 'PV Leistung',           selector: { entity: { domain: 'sensor' } } },
  { name: 'grid_entity', label: 'Netz Leistung',          selector: { entity: { domain: 'sensor' } } },
  { name: 'ev_entity',   label: 'Tesla SoC (optional)',   selector: { entity: { domain: 'sensor' } } },
];

const S_DOORBELL = [
  { name: 'doorbell_trigger', label: 'Klingel Trigger', selector: { entity: { domain: 'binary_sensor' } } },
  { name: 'doorbell_camera',  label: 'Kamera',          selector: { entity: { domain: 'camera' } } },
];

const LABEL = (s: { label?: string; name: string }) => s.label ?? s.name;

@customElement('nspanel-dashboard-editor')
export class NspanelDashboardEditor extends LitElement {
  @property({ attribute: false }) hass?: unknown;
  @state() private _config!: NspanelConfig;

  createRenderRoot() { return this; }

  setConfig(config: NspanelConfig) {
    this._config = config;
  }

  private _merge(e: CustomEvent) {
    this._config = { ...this._config, ...e.detail.value };
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
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  private _form(schema: object[]) {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${LABEL}
        @value-changed=${this._merge}
      ></ha-form>
    `;
  }

  render() {
    if (!this._config) return html``;
    const pages = this._config.pages ?? ['home'];

    return html`
      <style>
        .nsp-sec { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
          color:var(--secondary-text-color); margin:16px 0 4px; padding-bottom:4px;
          border-bottom:1px solid var(--divider-color); }
        .nsp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:8px; }
        .nsp-chip { padding:6px 14px; border-radius:980px; border:1.5px solid var(--divider-color);
          background:none; cursor:pointer; font-size:13px; color:var(--primary-text-color); }
        .nsp-chip.active { border-color:var(--primary-color); background:var(--primary-color); color:white; }
      </style>

      <div class="nsp-sec">Seiten</div>
      <div class="nsp-chips">
        ${ALL_PAGES.map(p => html`
          <button class="nsp-chip ${pages.includes(p.id) ? 'active' : ''}"
            @click=${() => this._togglePage(p.id)}>${p.label}</button>
        `)}
      </div>

      <div class="nsp-sec">Home</div>
      ${this._form(S_HOME)}

      <div class="nsp-sec">Climate</div>
      ${this._form(S_CLIMATE)}

      <div class="nsp-sec">Jalousien</div>
      ${this._form(S_BLINDS)}

      <div class="nsp-sec">Media</div>
      ${this._form(S_MEDIA)}

      <div class="nsp-sec">Energie</div>
      ${this._form(S_ENERGY)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(S_DOORBELL)}
    `;
  }
}
