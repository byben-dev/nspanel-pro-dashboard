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
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export type PageId = 'home' | 'climate' | 'blinds' | 'media' | 'energy';

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
  // Media
  media_player?: string;
  // Energy
  pv_entity?: string;
  grid_entity?: string;
  ev_entity?: string;
  // Doorbell
  doorbell_trigger?: string;
  doorbell_camera?: string;
}
