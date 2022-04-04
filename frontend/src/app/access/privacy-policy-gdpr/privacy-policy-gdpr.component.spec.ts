import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyGDPRComponent } from './privacy-policy-gdpr.component';

describe('PrivacyPolicyGDPRComponent', () => {
  let component: PrivacyPolicyGDPRComponent;
  let fixture: ComponentFixture<PrivacyPolicyGDPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyGDPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyGDPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
