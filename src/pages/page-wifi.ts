import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import QRCode from 'qrcode';
import type { NspanelConfig } from '../types';
import { tokens, pageBase } from '../styles/tokens';

function escapeWifi(str: string): string {
  return str.replace(/[\\;,":]/g, c => '\\' + c);
}

@customElement('nspanel-page-wifi')
export class NspanelPageWifi extends LitElement {
  @property({ attribute: false }) config!: NspanelConfig;
  @property({ type: Boolean }) dark = false;

  @state() private _qrUrl = '';
  private _lastKey = '';

  updated(changed: Map<string, unknown>) {
    if (changed.has('config') || changed.has('dark')) this._generateQr();
  }

  private async _generateQr() {
    const c = this.config ?? {};
    if (!c.wifi_ssid) { this._qrUrl = ''; return; }
    const security = c.wifi_security ?? 'WPA';
    const key = `${c.wifi_ssid}|${c.wifi_password ?? ''}|${security}`;
    if (key === this._lastKey) return;
    this._lastKey = key;
    const str = `WIFI:T:${security};S:${escapeWifi(c.wifi_ssid)};P:${escapeWifi(c.wifi_password ?? '')};H:false;;`;
    try {
      this._qrUrl = await QRCode.toDataURL(str, {
        width: 216,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      });
    } catch { this._qrUrl = ''; }
  }

  render() {
    const c = this.config ?? {};
    return html`
      <div class="page ${this.dark ? 'nsp-dark' : ''}">
        ${c.wifi_ssid ? html`
          <div class="wifi-card">
            <div class="wifi-header">GÄSTE-WLAN</div>
            ${this._qrUrl
              ? html`<img class="qr" src=${this._qrUrl} width="200" height="200" alt="QR Code">`
              : html`<div class="qr-placeholder"></div>`
            }
            <div class="wifi-ssid">📶  ${c.wifi_ssid}</div>
            ${c.wifi_password ? html`<div class="wifi-pass">${c.wifi_password}</div>` : ''}
          </div>
        ` : html`
          <div class="empty">Kein WLAN konfiguriert</div>
        `}
      </div>
    `;
  }

  static styles = [tokens, pageBase, css`
    .page {
      align-items: center;
      justify-content: center;
    }

    .wifi-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--nsp-s3);
      width: 100%;
      max-width: 300px;
    }

    .wifi-header {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--nsp-text-3);
      align-self: flex-start;
    }

    .qr {
      border-radius: 10px;
      display: block;
    }

    .qr-placeholder {
      width: 200px;
      height: 200px;
      background: var(--nsp-surface-3);
      border-radius: 10px;
    }

    .wifi-ssid {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 700;
      color: var(--nsp-text-1);
      letter-spacing: -0.01em;
    }

    .wifi-pass {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      letter-spacing: 0.04em;
      margin-top: -4px;
    }

    .empty {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }
  `];
}
