export interface Watering {
  id: number;
  plantId: number;
  wateringDate: string;  // también string ISO
  notes?: string;
  ownerUsername?: string;
}
