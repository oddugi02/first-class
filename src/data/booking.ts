import type { Destination, DestinationCode } from '../types/booking';

export const ORIGIN = {
  code: 'ICN',
  city: 'Seoul',
  airport: 'Incheon',
} as const;

export const DESTINATIONS: Record<DestinationCode, Destination> = {
  JFK: { code: 'JFK', city: 'New York', airport: 'JFK' },
  CDG: { code: 'CDG', city: 'Paris', airport: 'Charles de Gaulle' },
};

export const PRICES_KRW: Record<DestinationCode, number> = {
  JFK: 15_400_000,
  CDG: 14_800_000,
};

export const MILES_DISPLAY = '150,000';

export const FIRST_CLASS_SEATS = ['1A', '2A'] as const;

export function formatFlightDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatPriceKRW(amount: number): string {
  return `₩${amount.toLocaleString('ko-KR')}`;
}
