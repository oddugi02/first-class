export type SeatMode = 'upright' | 'relax' | 'bed';

export type TimeOfDay = 'sunrise' | 'day' | 'midnight';

export type AmbientSound = 'cabin' | null;

export interface CabinState {
  seatMode: SeatMode;
  recline: number;
  legRest: boolean;
  ambient: number;
  temperature: number;
  timeOfDay: TimeOfDay;
  /** True when midnight was auto-linked from bed mode */
  bedAmbienceLinked: boolean;
  /** True when dining mode linked warm light + cabin hum */
  diningAmbienceLinked: boolean;
}

export const SEAT_MODE_CONFIG: Record<
  SeatMode,
  { recline: number; legRest: boolean; label: string; sublabel: string }
> = {
  upright: { recline: 12, legRest: false, label: 'Upright', sublabel: 'Takeoff' },
  relax: { recline: 55, legRest: true, label: 'Relax', sublabel: 'Dining' },
  bed: { recline: 88, legRest: true, label: '180° Bed', sublabel: 'Mode' },
};

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  sunrise: 'Sunrise',
  day: 'Cruising Altitude',
  midnight: 'Midnight Flight',
};

export const AMBIENT_SOUND_LABEL = 'Cabin Hum';
