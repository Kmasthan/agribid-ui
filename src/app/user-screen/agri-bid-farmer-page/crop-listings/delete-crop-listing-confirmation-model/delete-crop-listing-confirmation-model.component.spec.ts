import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCropListingConfirmationModelComponent } from './delete-crop-listing-confirmation-model.component';

describe('DeleteCropListingConfirmationModelComponent', () => {
  let component: DeleteCropListingConfirmationModelComponent;
  let fixture: ComponentFixture<DeleteCropListingConfirmationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCropListingConfirmationModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCropListingConfirmationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
