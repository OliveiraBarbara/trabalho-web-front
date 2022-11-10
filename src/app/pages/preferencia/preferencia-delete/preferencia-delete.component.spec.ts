import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaDeleteComponent } from './preferencia-delete.component';

describe('PreferenciaDeleteComponent', () => {
  let component: PreferenciaDeleteComponent;
  let fixture: ComponentFixture<PreferenciaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
