import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NspanelConfig, PageId } from './types';

const DEFAULTS: Record<PageId, string> = {
  home: 'Home', climate: 'Climate', blinds: 'Blinds', media: 'Media', energy: 'Energy',
};

const ALL_PAGES: { id: PageId }[] = [
  { id: 'home' }, { id: 'climate' }, { id: 'blinds' }, { id: 'media' }, { id: 'energy' },
];

const S_HOME = [
  { name: 'weather_entity',  label: 'Wetter (weather.*)',                    selector: { entity: { domain: 'weather' } } },
  { name: 'calendar_entity', label: 'Kalender (calendar.*)',                  selector: { entity: { domain: 'calendar' } } },
  { name: 'trash_entity',    label: 'Müllabfuhr (sensor.* / calendar.*)',     selector: { entity: { domain: ['sensor','calendar'] } } },
  { name: 'person_1',        label: 'Person 1 (person.*)',                    selector: { entity: { domain: 'person' } } },
  { name: 'person_2',        label: 'Person 2 (person.*)',                    selector: { entity: { domain: 'person' } } },
  { name: 'garden_light',      label: 'Licht 1 (light.* / switch.*)',            selector: { entity: { domain: ['light','switch'] } } },
  { name: 'garden_light_icon', label: 'Licht 1 Icon (Emoji, leer = 💡)',         selector: { text: {} } },
  { name: 'light_2',           label: 'Licht 2 (light.* / switch.*) — optional', selector: { entity: { domain: ['light','switch'] } } },
  { name: 'light_2_icon',      label: 'Licht 2 Icon (Emoji, leer = 💡)',         selector: { text: {} } },
];

const S_CLIMATE = [
  { name: 'thermostat_entity', label: 'Thermostat (climate.*)', selector: { entity: { domain: 'climate' } } },
];

const S_BLINDS = [
  { name: 'cover_1', label: 'Cover / Jalousie 1 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_2', label: 'Cover / Jalousie 2 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_3', label: 'Cover / Jalousie 3 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_4', label: 'Cover / Jalousie 4 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_5', label: 'Cover / Jalousie 5 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_6', label: 'Cover / Jalousie 6 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_7', label: 'Cover / Jalousie 7 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'cover_8', label: 'Cover / Jalousie 8 (cover.*)', selector: { entity: { domain: 'cover' } } },
  { name: 'scene_up',   label: 'Szene: Alle öffnen (scene.* / script.*)',    selector: { entity: { domain: ['scene','script'] } } },
  { name: 'scene_down', label: 'Szene: Alle schließen (scene.* / script.*)', selector: { entity: { domain: ['scene','script'] } } },
];

const S_MEDIA = [
  { name: 'media_player', label: 'Media Player (media_player.*)', selector: { entity: { domain: 'media_player' } } },
];

const S_ENERGY = [
  { name: 'pv_entity',   label: 'PV Erzeugung (sensor.*, W oder kW)',  selector: { entity: { domain: 'sensor' } } },
  { name: 'grid_entity', label: 'Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)', selector: { entity: { domain: 'sensor' } } },
  { name: 'ev_entity',   label: 'EV / Akku SoC in % (sensor.*) — optional', selector: { entity: { domain: 'sensor' } } },
];

const S_DOORBELL = [
  { name: 'doorbell_trigger', label: 'Klingel-Auslöser (binary_sensor.*)', selector: { entity: { domain: 'binary_sensor' } } },
  { name: 'doorbell_camera',  label: 'Kamera für Livestream (camera.*)',   selector: { entity: { domain: 'camera' } } },
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
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${schema}
        .computeLabel=${LABEL} @value-changed=${this._merge}></ha-form>
    `;
  }

  render() {
    if (!this._config) return html``;
    const c = this._config;
    const pages = c.pages ?? ['home'];

    const labelKey = (id: PageId) => `${id}_label` as keyof NspanelConfig;
    const customLabel = (id: PageId) => (c[labelKey(id)] as string | undefined) ?? '';

    return html`
      <style>
        .nsp-sec { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
          color:var(--secondary-text-color); margin:16px 0 4px; padding-bottom:4px;
          border-bottom:1px solid var(--divider-color); }
        .nsp-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .nsp-chip { padding:6px 14px; border-radius:980px; border:1.5px solid var(--divider-color);
          background:none; cursor:pointer; font-size:13px; color:var(--primary-text-color); }
        .nsp-chip.active { border-color:var(--primary-color); background:var(--primary-color); color:white; }
        .nsp-details { margin:6px 0 0; border-radius:8px; border:1px solid var(--divider-color); overflow:hidden; }
        .nsp-details summary { padding:8px 12px; cursor:pointer; font-size:12px;
          color:var(--secondary-text-color); list-style:none; display:flex; align-items:center; gap:6px; }
        .nsp-details summary::before { content:'▶'; font-size:10px; transition:transform .2s; }
        .nsp-details[open] summary::before { transform:rotate(90deg); }
        .nsp-details-body { padding:4px 12px 12px; }
      </style>

      <div class="nsp-sec">Seiten</div>
      <div class="nsp-chips">
        ${ALL_PAGES.map(p => html`
          <button class="nsp-chip ${pages.includes(p.id) ? 'active' : ''}"
            @click=${() => this._togglePage(p.id)}>
            ${customLabel(p.id) || DEFAULTS[p.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(ALL_PAGES.map(p => ({
            name: `${p.id}_label`,
            label: `${DEFAULTS[p.id]} — benutzerdefinierter Name`,
            selector: { text: {} },
          })))}
        </div>
      </details>

      <div class="nsp-sec">Home</div>
      ${this._form(S_HOME)}
      <details class="nsp-details">
        <summary>🗑️ Müll-Kategorien anpassen</summary>
        <div class="nsp-details-body">
          <p style="font-size:12px;color:var(--secondary-text-color);margin:0 0 8px">
            Format: <code>schlüsselwort,weiteres=🔴</code> (eine Kategorie pro Zeile)<br>
            Leer lassen für Standard: papier=🔴 · gelb,sack=🟡 · rest,sperr=⚫
          </p>
          ${this._form([{
            name: 'trash_mapping',
            label: 'Kategorie-Mapping (leer = Standard)',
            selector: { text: { multiline: true } },
          }])}
        </div>
      </details>

      <div class="nsp-sec">Climate</div>
      ${this._form(S_CLIMATE)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(S_BLINDS)}

      <div class="nsp-sec">Media</div>
      ${this._form(S_MEDIA)}

      <div class="nsp-sec">Energie</div>
      ${this._form(S_ENERGY)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(S_DOORBELL)}

      <div class="nsp-sec">Hintergrund</div>
      ${this._form([
        { name: 'bg_accent_1', label: 'Glow-Farbe 1 (Hex, z.B. #0A84FF — leer = iOS Blau)', selector: { text: {} } },
        { name: 'bg_accent_2', label: 'Glow-Farbe 2 (Hex, z.B. #BF5AF2 — leer = iOS Lila)', selector: { text: {} } },
      ])}
    `;
  }
}
