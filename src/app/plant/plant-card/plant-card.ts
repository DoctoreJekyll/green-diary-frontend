// plant-card.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.html',
  standalone: true,
  imports: [CommonModule]
})
export class PlantCard {
  @Input() plant!: Plant;
  @Output() watered = new EventEmitter<Plant>();

  constructor(private plantService: PlantService) {}

  waterPlant() {
    // opción: llamar endpoint que crea un watering (si existe)
    this.plantService.addWatering(this.plant.id).subscribe({
      next: () => {
        // Si backend no devuelve la planta actualizada, hacemos un patch para actualizar lastWatered
        this.plantService.getPlant(this.plant.id).subscribe({
          next: (p) => { this.plant = p; this.watered.emit(p); },
          error: () => {
            // fallback: marcar localmente con la fecha ahora
            this.plant.lastWatered = new Date().toISOString();
            this.watered.emit(this.plant);
          }
        });
      },
      error: () => {
        // Fallback rápido: marcar local y avisar
        this.plant.lastWatered = new Date().toISOString();
        this.watered.emit(this.plant);
      }
    });
  }
}
