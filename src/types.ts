export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: { darkMode: boolean };
  user: { name: string };
  language: string;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ): Promise<void>;
  callWS<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  fetchWithAuth(url: string, init?: RequestInit): Promise<Response>;
}

export interface CalendarEvent {
  summary: string;
  start: { dateTime?: string; date?: string };
  end:   { dateTime?: string; date?: string };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export type PageId = 'home' | 'climate' | 'blinds' | 'media' | 'energy' | 'security';

export interface NspanelConfig {
  pages?: PageId[];
  // Home
  weather_entity?: string;
  calendar_entity?: string;
  trash_entity?: string;
  person_1?: string;
  person_2?: string;
  // Climate
  thermostat_entity?: string;
  // Blinds
  cover_1?: string;
  cover_2?: string;
  cover_3?: string;
  cover_4?: string;
  cover_5?: string;
  cover_6?: string;
  cover_7?: string;
  cover_8?: string;
  scene_up?: string;
  scene_down?: string;
  garden_light?: string;
  garden_light_icon?: string;
  light_2?: string;
  light_2_icon?: string;
  // Appliances
  vacuum_entity?: string;
  dishwasher_entity?: string;
  // Media
  media_player?: string;
  // Energy
  pv_entity?: string;
  grid_entity?: string;
  ev_entity?: string;
  pv_today_entity?: string;
  forecast_today_entity?: string;
  forecast_tomorrow_entity?: string;
  // Page labels (optional, falls back to defaults)
  home_label?: string;
  climate_label?: string;
  blinds_label?: string;
  media_label?: string;
  energy_label?: string;
  // Trash category mapping (one rule per line: "keyword,kw2=🔴")
  trash_mapping?: string;
  // Appearance
  bg_accent_1?: string;
  bg_accent_2?: string;
  // Security cameras
  camera_1?: string;
  camera_2?: string;
  camera_3?: string;
  camera_4?: string;
  cameras_portrait?: boolean;
  security_label?: string;
  // Doorbell
  doorbell_trigger?: string;
  doorbell_camera?: string;
}
