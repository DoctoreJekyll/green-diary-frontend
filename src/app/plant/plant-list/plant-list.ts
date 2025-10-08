import { Component, OnInit } from '@angular/core';
import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';
import { PlantForm } from "../plant-form/plant-form";
import { PlantCard } from "../plant-card/plant-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.html',
  standalone: true,
  imports: [PlantForm, PlantCard, CommonModule]
})
export class PlantList implements OnInit {
  plants: Plant[] = [];
  loading = false;
  error?: string;
  showForm = false;


  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.loadPlants();
  }

  loadPlants() {
    this.loading = true;
    this.plantService.getPlants().subscribe({
      next: (data) => { this.plants = data; this.loading = false; },
      error: (err) => { this.error = err?.message || 'Error cargando plantas'; this.loading = false; }
    });
  }

  // manejador para cuando el hijo (form) emite una planta nueva
  onPlantAdded(newPlant: Plant) {
    // puedes optimizar insertando en array para ver la nueva inmediatamente
    this.plants.unshift(newPlant);
  }

  // si el card nos dice que se ha regado, recarga o actualiza el item:
  onPlantWatered(updatedPlant: Plant) {
    const idx = this.plants.findIndex(p => p.id === updatedPlant.id);
    if (idx >= 0) this.plants[idx] = updatedPlant;
  }

  handleLocalAdd(formModel: Partial<Plant>) {
  this.plantService.addPlant(formModel).subscribe({
    next: (created) => this.onPlantAdded(created),
    error: (err) => this.error = 'Error al crear planta: ' + (err.message || '')
  });
  }
}
