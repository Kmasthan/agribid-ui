import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropListingsComponent } from './crop-listings.component';

describe('CropListingsComponent', () => {
  let component: CropListingsComponent;
  let fixture: ComponentFixture<CropListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
