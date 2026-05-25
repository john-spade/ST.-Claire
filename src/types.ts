export interface TimelineItem {
  year: string;
  title: string;
  location: string;
  description: string;
  image: string;
}

export interface RoomSuite {
  id: string;
  name: string;
  type: 'room' | 'suite';
  sqft: number;
  occupancy: number;
  rate: number;
  view: string;
  highlights: string[];
  image: string;
}

export interface DiningOutlet {
  id: string;
  name: string;
  concept: string;
  hours: string;
  description: string;
  image: string;
  accentQuote: string;
}

export interface Reservation {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
}
