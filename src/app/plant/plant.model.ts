export interface Plant {
  id: number;
  name: string;
  species?: string;
  location?: string;
  notes?: string;
  lastWatered?: string;
  ownerUsername?: string;
}
