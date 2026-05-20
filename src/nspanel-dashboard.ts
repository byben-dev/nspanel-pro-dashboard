import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig, PageId } from './types';
import { tokens } from './styles/tokens';
import './components/bottom-nav';
import './components/status-bar';
import './components/doorbell-popup';
import './pages/page-home';
import './pages/page-climate';
import './pages/page-blinds';
import './pages/page-media';
import './pages/page-energy';
import './nspanel-dashboard-editor';

@customElement('nspanel-dashboard')
export class NspanelDashboard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: NspanelConfig;
  @state() private _activePage: PageId = 'home';
  @state() private _doorbellActive = false;
  @state() private _dark = false;

  static getConfigElement() {
    return document.createElement('nspanel-dashboard-editor');
  }

  static getStubConfig(): NspanelConfig {
    return { pages: ['home', 'climate', 'blinds', 'media', 'energy'] };
  }

  setConfig(config: NspanelConfig) {
    if (!config) throw new Error('Invalid config');
    this._config = config;
    const pages = config.pages ?? ['home'];
    if (!pages.includes(this._activePage)) this._activePage = pages[0];
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('hass') && this.hass) {
      this._dark = this.hass.themes?.darkMode ?? false;

      // Doorbell trigger
      const trigger = this._config?.doorbell_trigger;
      if (trigger) {
        const prev = changed.get('hass') as HomeAssistant | undefined;
        const wasOff = prev?.states[trigger]?.state !== 'on';
        const isOn  = this.hass.states[trigger]?.state === 'on';
        if (wasOff && isOn) this._doorbellActive = true;
      }
    }
  }

  private get _pages(): PageId[] {
    return this._config?.pages ?? ['home'];
  }

  render() {
    if (!this._config) return html``;
    const dark = this._dark;

    return html`
      <div class="shell ${dark ? 'nsp-dark' : ''}">
        <nspanel-status-bar
          .hass=${this.hass}
          .config=${this._config}
          ?dark=${dark}
        ></nspanel-status-bar>
        <div class="content">
          ${this._renderPage()}
        </div>

        <nspanel-bottom-nav
          .pages=${this._pages}
          .activePage=${this._activePage}
          .customLabels=${{
            home:    this._config.home_label,
            climate: this._config.climate_label,
            blinds:  this._config.blinds_label,
            media:   this._config.media_label,
            energy:  this._config.energy_label,
          }}
          @page-change=${(e: CustomEvent<{ page: PageId }>) => { this._activePage = e.detail.page; }}
        ></nspanel-bottom-nav>

        ${this._doorbellActive ? html`
          <nspanel-doorbell-popup
            .hass=${this.hass}
            .cameraEntity=${this._config.doorbell_camera ?? ''}
            @dismiss=${() => { this._doorbellActive = false; }}
          ></nspanel-doorbell-popup>
        ` : ''}
      </div>
    `;
  }

  private _renderPage() {
    const h = this.hass;
    const c = this._config;
    const d = this._dark;
    switch (this._activePage) {
      case 'home':    return html`<nspanel-page-home    .hass=${h} .config=${c} ?dark=${d}></nspanel-page-home>`;
      case 'climate': return html`<nspanel-page-climate .hass=${h} .config=${c} ?dark=${d}></nspanel-page-climate>`;
      case 'blinds':  return html`<nspanel-page-blinds  .hass=${h} .config=${c} ?dark=${d}></nspanel-page-blinds>`;
      case 'media':   return html`<nspanel-page-media   .hass=${h} .config=${c} ?dark=${d}></nspanel-page-media>`;
      case 'energy':  return html`<nspanel-page-energy  .hass=${h} .config=${c} ?dark=${d}></nspanel-page-energy>`;
      default:        return html``;
    }
  }

  static styles = [tokens, css`
    :host {
      display: block;
    }
    .shell {
      width: 100%;
      height: 100%;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      background: var(--nsp-bg);
      overflow: hidden;
      position: relative;
    }
    .content {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'nspanel-dashboard': NspanelDashboard;
  }
}
