import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NspanelConfig, PageId } from './types';

const ALL_PAGES: { id: PageId; label: string }[] = [
  { id: 'home',    label: 'Home' },
  { id: 'climate', label: 'Climate' },
  { id: 'blinds',  label: 'Blinds' },
  { id: 'media',   label: 'Media' },
  { id: 'energy',  label: 'Energy' },
];

const COVER_SLOTS = [1,2,3,4,5,6,7,8] as const;

@customElement('nspanel-dashboard-editor')
export class NspanelDashboardEditor extends LitElement {
  @property({ attribute: false }) hass?: unknown;
  @state() private _config!: NspanelConfig;

  createRenderRoot() { return this; }

  setConfig(config: NspanelConfig) {
    this._config = config;
  }

  private _set(key: keyof NspanelConfig, value: unknown) {
    this._config = { ...this._config, [key]: value || undefined };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  private _togglePage(id: PageId) {
    const pages = [...(this._config.pages ?? ['home'])];
    const idx = pages.indexOf(id);
    if (idx >= 0) { if (pages.length > 1) pages.splice(idx, 1); }
    else pages.push(id);
    this._set('pages', pages);
  }

  private _field(label: string, key: keyof NspanelConfig, placeholder = '') {
    const value = String((this._config as Record<string, unknown>)[key] ?? '');
    return html`
      <div class="nsp-field">
        <label class="nsp-label">${label}</label>
        <input class="nsp-input" type="text"
          placeholder="${placeholder || label.toLowerCase().replace(/ /g, '.')}"
          .value=${value}
          @change=${(e: Event) => this._set(key, (e.target as HTMLInputElement).value.trim())}
        />
      </div>
    `;
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;
    const pages = c.pages ?? ['home'];

    return html`
      <style>
        .nsp-section { font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .06em; color: var(--secondary-text-color);
          margin: 16px 0 4px; padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
        .nsp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
        .nsp-chip { padding: 6px 14px; border-radius: 980px; border: 1.5px solid var(--divider-color);
          background: none; cursor: pointer; font-size: 13px; color: var(--primary-text-color); }
        .nsp-chip.active { border-color: var(--primary-color); background: var(--primary-color); color: white; }
        .nsp-field { display: flex; flex-direction: column; gap: 2px; margin: 6px 0; }
        .nsp-label { font-size: 12px; color: var(--secondary-text-color); }
        .nsp-input { height: 40px; padding: 0 10px; border-radius: 6px;
          border: 1px solid var(--divider-color); background: var(--card-background-color);
          color: var(--primary-text-color); font-size: 14px; box-sizing: border-box; width: 100%; }
        .nsp-input:focus { outline: none; border-color: var(--primary-color); }
      </style>

      <div class="nsp-section">Seiten</div>
      <div class="nsp-chips">
        ${ALL_PAGES.map(p => html`
          <button class="nsp-chip ${pages.includes(p.id) ? 'active' : ''}"
            @click=${() => this._togglePage(p.id)}>${p.label}</button>
        `)}
      </div>

      <div class="nsp-section">Home</div>
      ${this._field('Wetter', 'weather_entity', 'weather.home')}
      ${this._field('Kalender', 'calendar_entity', 'calendar.home')}
      ${this._field('Müllabfuhr Sensor', 'trash_entity', 'sensor.muell')}
      ${this._field('Person 1', 'person_1', 'person.name')}
      ${this._field('Person 2', 'person_2', 'person.name')}

      <div class="nsp-section">Climate</div>
      ${this._field('Thermostat', 'thermostat_entity', 'climate.nspanel')}

      <div class="nsp-section">Jalousien</div>
      ${COVER_SLOTS.map(i => this._field(`Jalousie ${i}`, `cover_${i}` as keyof NspanelConfig, `cover.jalousie_${i}`))}
      ${this._field('Gartenlicht', 'garden_light', 'light.garten')}
      ${this._field('Szene Alle hoch', 'scene_up', 'scene.jalousien_hoch')}
      ${this._field('Szene Alle runter', 'scene_down', 'scene.jalousien_runter')}

      <div class="nsp-section">Media</div>
      ${this._field('Media Player', 'media_player', 'media_player.spotify')}

      <div class="nsp-section">Energie</div>
      ${this._field('PV Leistung', 'pv_entity', 'sensor.pv_power')}
      ${this._field('Netz Leistung', 'grid_entity', 'sensor.grid_power')}
      ${this._field('Tesla SoC (optional)', 'ev_entity', 'sensor.tesla_battery')}

      <div class="nsp-section">Türklingel</div>
      ${this._field('Klingel Trigger', 'doorbell_trigger', 'binary_sensor.doorbell')}
      ${this._field('Kamera', 'doorbell_camera', 'camera.eingang')}
    `;
  }
}
