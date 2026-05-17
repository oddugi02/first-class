export type DestinationCode = 'JFK' | 'CDG';

export interface Destination {
  code: DestinationCode;
  city: string;
  airport: string;
}

export interface BookingDetails {
  destination: DestinationCode;
  date: Date;
  seat: '1A' | '2A';
  useMiles: boolean;
}
