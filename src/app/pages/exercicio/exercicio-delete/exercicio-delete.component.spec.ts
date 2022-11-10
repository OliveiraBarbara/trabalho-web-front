import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicioDeleteComponent } from './exercicio-delete.component';

describe('ExercicioDeleteComponent', () => {
  let component: ExercicioDeleteComponent;
  let fixture: ComponentFixture<ExercicioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercicioDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercicioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
