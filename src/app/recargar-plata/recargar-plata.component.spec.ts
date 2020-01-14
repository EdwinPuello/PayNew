import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargarPlataComponent } from './recargar-plata.component';

describe('RecargarPlataComponent', () => {
  let component: RecargarPlataComponent;
  let fixture: ComponentFixture<RecargarPlataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecargarPlataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargarPlataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
