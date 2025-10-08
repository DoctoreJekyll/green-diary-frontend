import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCard } from './plant-card';

describe('PlantCard', () => {
  let component: PlantCard;
  let fixture: ComponentFixture<PlantCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
