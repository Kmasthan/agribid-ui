import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropBiddingsComponent } from './crop-biddings.component';

describe('CropBiddingsComponent', () => {
  let component: CropBiddingsComponent;
  let fixture: ComponentFixture<CropBiddingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropBiddingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropBiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
