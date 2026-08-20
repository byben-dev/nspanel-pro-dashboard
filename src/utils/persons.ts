import type { NspanelConfig } from '../types';

export const PERSON_SLOTS = [
  { key: 'person_1', iconKey: 'person_1_icon', icon: '👩🏻' },
  { key: 'person_2', iconKey: 'person_2_icon', icon: '👨🏻' },
  { key: 'person_3', iconKey: 'person_3_icon', icon: '👵🏻' },
  { key: 'person_4', iconKey: 'person_4_icon', icon: '👴🏻' },
  { key: 'person_5', iconKey: 'person_5_icon', icon: '🧒🏻' },
  { key: 'person_6', iconKey: 'person_6_icon', icon: '🧒🏻' },
] as const satisfies ReadonlyArray<{ key: keyof NspanelConfig; iconKey: keyof NspanelConfig; icon: string }>;
