import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerRegistrationModelComponent } from './farmer-registration-model.component';

describe('FarmerRegistrationModelComponent', () => {
  let component: FarmerRegistrationModelComponent;
  let fixture: ComponentFixture<FarmerRegistrationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerRegistrationModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarmerRegistrationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
