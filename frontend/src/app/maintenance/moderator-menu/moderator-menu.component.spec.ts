import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorMenuComponent } from './moderator-menu.component';

describe('ModeratorMenuComponent', () => {
  let component: ModeratorMenuComponent;
  let fixture: ComponentFixture<ModeratorMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
