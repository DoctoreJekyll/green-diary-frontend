import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './plant.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantService {
  private base = environment.apiBaseUrl; // ej. http://localhost:8080

  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.base}/plants`);
  }

  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.base}/plants/${id}`);
  }

  addPlant(plant: Partial<Plant>): Observable<Plant> {
    return this.http.post<Plant>(`${this.base}/plants`, plant);
  }

  // Opción A: endpoint específico para crear un "watering" (si lo tienes)
addWatering(plantId: number, notes?: string): Observable<any> {
  const body = { wateringDate: new Date().toISOString(), notes: notes || '' };
  return this.http.post(`${this.base}/plants/${plantId}/watering`, body);
}
}
