import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTreinamentoEditComponent } from './local-treinamento-edit.component';

describe('LocalTreinamentoEditComponent', () => {
  let component: LocalTreinamentoEditComponent;
  let fixture: ComponentFixture<LocalTreinamentoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalTreinamentoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalTreinamentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
