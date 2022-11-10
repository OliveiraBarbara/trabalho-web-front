import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaEditComponent } from './preferencia-edit.component';

describe('PreferenciaEditComponent', () => {
  let component: PreferenciaEditComponent;
  let fixture: ComponentFixture<PreferenciaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
