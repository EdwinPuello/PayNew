import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarPLataComponent } from './pasar-plata.component';

describe('PasarPLataComponent', () => {
  let component: PasarPLataComponent;
  let fixture: ComponentFixture<PasarPLataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasarPLataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasarPLataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
