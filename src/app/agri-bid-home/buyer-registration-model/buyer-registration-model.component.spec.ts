import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRegistrationModelComponent } from './buyer-registration-model.component';

describe('BuyerRegistrationModelComponent', () => {
  let component: BuyerRegistrationModelComponent;
  let fixture: ComponentFixture<BuyerRegistrationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerRegistrationModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerRegistrationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
