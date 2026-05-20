import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

@customElement('nspanel-page-home')
export class NspanelPageHome extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: NspanelConfig;

  @state() private _time = '';
  @state() private _date = '';

  private _timer?: number;

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._timer = window.setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timer);
  }

  private _tick() {
    const now = new Date();
    this._time = now.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' });
    this._date = now.toLocaleDateString('de-AT', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  private get _weather() {
    if (!this.config?.weather_entity) return null;
    return this.hass?.states[this.config.weather_entity] ?? null;
  }

  render() {
    const w = this._weather;
    const temp = w ? `${Math.round(w.attributes['temperature'] as number)}°` : null;
    const condition = w?.state ?? null;

    return html`
      <div class="page">

        <!-- Clock -->
        <div class="clock-block">
          <div class="time">${this._time}</div>
          <div class="date">${this._date}</div>
        </div>

        <!-- Weather -->
        ${w ? html`
          <div class="card weather-row">
            <div class="weather-temp">${temp}</div>
            <div class="weather-condition">${condition}</div>
          </div>
        ` : ''}

        <!-- Placeholders for next events, trash — coming soon -->
        <div class="coming-soon">
          <span>Weather · Calendar · Trash · Presence</span><br/>
          <span>— coming in next session —</span>
        </div>

      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .clock-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--nsp-s5) 0 var(--nsp-s3);
    }

    .time {
      font-family: var(--nsp-font);
      font-size: 72px;
      font-weight: 300;
      letter-spacing: -0.04em;
      color: var(--nsp-text-1);
      line-height: 1;
    }

    .date {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 400;
      color: var(--nsp-text-2);
      margin-top: var(--nsp-s2);
    }

    .weather-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .weather-temp {
      font-family: var(--nsp-font);
      font-size: 32px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .weather-condition {
      font-family: var(--nsp-font);
      font-size: 15px;
      color: var(--nsp-text-2);
      text-transform: capitalize;
    }

    .coming-soon {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      line-height: 1.8;
    }
  `];
}
