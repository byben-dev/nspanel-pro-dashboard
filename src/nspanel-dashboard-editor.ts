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

@customElement('nspanel-dashboard-editor')
export class NspanelDashboardEditor extends LitElement {
  @property({ attribute: false }) hass?: unknown;
  @state() private _config!: NspanelConfig;

  setConfig(config: NspanelConfig) {
    this._config = config;
  }

  private _changed(key: keyof NspanelConfig, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }

  private _togglePage(id: PageId) {
    const pages = [...(this._config.pages ?? ['home'])];
    const idx = pages.indexOf(id);
    if (idx >= 0) {
      if (pages.length > 1) pages.splice(idx, 1);
    } else {
      pages.push(id);
    }
    this._changed('pages', pages);
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;
    const pages = c.pages ?? ['home'];

    return html`
      <div class="editor">

        <div class="section-title">Pages</div>
        <div class="page-chips">
          ${ALL_PAGES.map(p => html`
            <button
              class="chip ${pages.includes(p.id) ? 'active' : ''}"
              @click=${() => this._togglePage(p.id)}
            >${p.label}</button>
          `)}
        </div>

        <div class="section-title">Home</div>
        <ha-entity-picker
          label="Weather Entity"
          .hass=${this.hass}
          .value=${c.weather_entity ?? ''}
          .includeDomains=${['weather']}
          @value-changed=${(e: CustomEvent) => this._changed('weather_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Calendar Entity"
          .hass=${this.hass}
          .value=${c.calendar_entity ?? ''}
          .includeDomains=${['calendar']}
          @value-changed=${(e: CustomEvent) => this._changed('calendar_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Trash / Waste Collection Sensor"
          .hass=${this.hass}
          .value=${c.trash_entity ?? ''}
          .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('trash_entity', e.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Climate</div>
        <ha-entity-picker
          label="Thermostat Entity"
          .hass=${this.hass}
          .value=${c.thermostat_entity ?? ''}
          .includeDomains=${['climate']}
          @value-changed=${(e: CustomEvent) => this._changed('thermostat_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Indoor Temperature Sensor"
          .hass=${this.hass}
          .value=${c.indoor_temp_entity ?? ''}
          .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('indoor_temp_entity', e.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Blinds</div>
        <ha-entity-picker
          label="Scene: All Up"
          .hass=${this.hass}
          .value=${c.scene_up ?? ''}
          .includeDomains=${['scene', 'script']}
          @value-changed=${(e: CustomEvent) => this._changed('scene_up', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Scene: All Down"
          .hass=${this.hass}
          .value=${c.scene_down ?? ''}
          .includeDomains=${['scene', 'script']}
          @value-changed=${(e: CustomEvent) => this._changed('scene_down', e.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Media</div>
        <ha-entity-picker
          label="Media Player"
          .hass=${this.hass}
          .value=${c.media_player ?? ''}
          .includeDomains=${['media_player']}
          @value-changed=${(e: CustomEvent) => this._changed('media_player', e.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Energy</div>
        <ha-entity-picker
          label="PV Power Sensor"
          .hass=${this.hass}
          .value=${c.pv_entity ?? ''}
          .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('pv_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Grid Power Sensor"
          .hass=${this.hass}
          .value=${c.grid_entity ?? ''}
          .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('grid_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="EV / Tesla SoC Sensor"
          .hass=${this.hass}
          .value=${c.ev_entity ?? ''}
          .includeDomains=${['sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('ev_entity', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Garden Light"
          .hass=${this.hass}
          .value=${c.garden_light ?? ''}
          .includeDomains=${['light', 'switch']}
          @value-changed=${(e: CustomEvent) => this._changed('garden_light', e.detail.value)}
        ></ha-entity-picker>

        <div class="section-title">Doorbell</div>
        <ha-entity-picker
          label="Doorbell Trigger (binary_sensor)"
          .hass=${this.hass}
          .value=${c.doorbell_trigger ?? ''}
          .includeDomains=${['binary_sensor']}
          @value-changed=${(e: CustomEvent) => this._changed('doorbell_trigger', e.detail.value)}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Doorbell Camera"
          .hass=${this.hass}
          .value=${c.doorbell_camera ?? ''}
          .includeDomains=${['camera']}
          @value-changed=${(e: CustomEvent) => this._changed('doorbell_camera', e.detail.value)}
        ></ha-entity-picker>

      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 0;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
      margin-top: 12px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color);
    }
    .page-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      padding: 6px 14px;
      border-radius: 980px;
      border: 1.5px solid var(--divider-color);
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .chip.active {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    ha-entity-picker {
      display: block;
    }
  `;
}
