import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarPlataComponent } from './enviar-plata.component';

describe('EnviarPlataComponent', () => {
  let component: EnviarPlataComponent;
  let fixture: ComponentFixture<EnviarPlataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarPlataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarPlataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
