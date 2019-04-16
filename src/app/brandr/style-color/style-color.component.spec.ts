import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleColorComponent } from './style-color.component';

describe('StyleColorComponent', () => {
  let component: StyleColorComponent;
  let fixture: ComponentFixture<StyleColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
