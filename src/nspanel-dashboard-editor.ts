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

  setConfig(config: NspanelConfig) {
    this._config = config;
  }

  private _set(key: keyof NspanelConfig, value: unknown) {
    this._config = { ...this._config, [key]: value };
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

  private _picker(label: string, key: keyof NspanelConfig, domains: string[]) {
    return html`
      <ha-entity-picker
        label="${label}"
        .hass=${this.hass}
        .value=${(this._config as Record<string, unknown>)[key] ?? ''}
        .includeDomains=${domains}
        @value-changed=${(e: CustomEvent) => this._set(key, e.detail.value)}
      ></ha-entity-picker>
    `;
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;
    const pages = c.pages ?? ['home'];

    return html`
      <div class="editor">

        <div class="section-title">Seiten</div>
        <div class="page-chips">
          ${ALL_PAGES.map(p => html`
            <button class="chip ${pages.includes(p.id) ? 'active' : ''}"
              @click=${() => this._togglePage(p.id)}>${p.label}</button>
          `)}
        </div>

        <div class="section-title">Home</div>
        ${this._picker('Wetter', 'weather_entity', ['weather'])}
        ${this._picker('Kalender', 'calendar_entity', ['calendar'])}
        ${this._picker('Müllabfuhr Sensor', 'trash_entity', ['sensor', 'calendar'])}
        ${this._picker('Person 1', 'person_1', ['person'])}
        ${this._picker('Person 2', 'person_2', ['person'])}

        <div class="section-title">Climate</div>
        ${this._picker('Thermostat', 'thermostat_entity', ['climate'])}

        <div class="section-title">Jalousien</div>
        ${COVER_SLOTS.map(i => this._picker(
          `Jalousie ${i}`,
          `cover_${i}` as keyof NspanelConfig,
          ['cover']
        ))}
        ${this._picker('Gartenlicht', 'garden_light', ['light', 'switch'])}
        ${this._picker('Szene: Alle hoch', 'scene_up', ['scene', 'script'])}
        ${this._picker('Szene: Alle runter', 'scene_down', ['scene', 'script'])}

        <div class="section-title">Media</div>
        ${this._picker('Media Player', 'media_player', ['media_player'])}

        <div class="section-title">Energie</div>
        ${this._picker('PV Leistung', 'pv_entity', ['sensor'])}
        ${this._picker('Netz Leistung', 'grid_entity', ['sensor'])}
        ${this._picker('Tesla SoC (optional)', 'ev_entity', ['sensor'])}

        <div class="section-title">Türklingel</div>
        ${this._picker('Klingel Trigger', 'doorbell_trigger', ['binary_sensor'])}
        ${this._picker('Kamera', 'doorbell_camera', ['camera'])}

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
    .page-chips { display: flex; flex-wrap: wrap; gap: 6px; }
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
    ha-entity-picker { display: block; }
  `;
}
