import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioReportComponent } from './usuario-report.component';

describe('UsuarioAddComponent', () => {
  let component: UsuarioReportComponent;
  let fixture: ComponentFixture<UsuarioReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
