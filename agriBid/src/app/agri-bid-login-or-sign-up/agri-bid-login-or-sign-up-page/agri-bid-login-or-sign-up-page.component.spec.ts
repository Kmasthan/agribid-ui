import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriBidLoginOrSignUpPageComponent } from './agri-bid-login-or-sign-up-page.component';

describe('AgriBidLoginOrSignUpPageComponent', () => {
  let component: AgriBidLoginOrSignUpPageComponent;
  let fixture: ComponentFixture<AgriBidLoginOrSignUpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriBidLoginOrSignUpPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriBidLoginOrSignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
