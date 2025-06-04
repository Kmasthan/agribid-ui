import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCropListingModelComponent } from './new-crop-listing-model.component';

describe('NewCropListingModelComponent', () => {
  let component: NewCropListingModelComponent;
  let fixture: ComponentFixture<NewCropListingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCropListingModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCropListingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
