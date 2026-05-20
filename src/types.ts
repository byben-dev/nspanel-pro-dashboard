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

export interface CoverConfig {
  entity: string;
  name?: string;
}

export interface RadioStation {
  name: string;
  url: string;
}

export interface NspanelConfig {
  pages?: PageId[];
  // Home
  weather_entity?: string;
  calendar_entity?: string;
  trash_entity?: string;
  persons?: string[];
  // Climate
  thermostat_entity?: string;
  indoor_temp_entity?: string;
  // Blinds
  covers?: CoverConfig[];
  scene_up?: string;
  scene_down?: string;
  // Media
  media_player?: string;
  radio_stations?: RadioStation[];
  // Energy
  pv_entity?: string;
  grid_entity?: string;
  ev_entity?: string;
  garden_light?: string;
  // Doorbell
  doorbell_trigger?: string;
  doorbell_camera?: string;
}
