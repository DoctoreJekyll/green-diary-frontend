import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plant } from '../plant.model';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PlantForm {
  @Output() added = new EventEmitter<Plant>();

  // estado local del formulario
  model: Partial<Plant> = {
    name: '',
    species: '',
    location: '',
    notes: '',
    lastWatered: undefined
  };

  // variable temporal para el input de tipo date
  lastWateredString?: string;

  submit() {
    if (!this.model.name || this.model.name.trim().length === 0) return;

    const newPlant: Plant = {
      id: Date.now(), // id temporal para demo
      name: this.model.name!.trim(),
      species: this.model.species?.trim() || '',
      location: this.model.location?.trim() || '',
      notes: this.model.notes?.trim() || '',
      lastWatered: this.lastWateredString ? this.lastWateredString : undefined
    };

    this.added.emit(newPlant);

    // limpiar form
    this.model = { name: '', species: '', location: '', notes: '', lastWatered: undefined };
    this.lastWateredString = undefined;
  }
}
