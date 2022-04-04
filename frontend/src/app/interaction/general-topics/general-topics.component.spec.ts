import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTopicsComponent } from './general-topics.component';

describe('GeneralTopicsComponent', () => {
  let component: GeneralTopicsComponent;
  let fixture: ComponentFixture<GeneralTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
