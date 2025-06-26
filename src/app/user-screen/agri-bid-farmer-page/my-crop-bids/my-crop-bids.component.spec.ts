import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCropBidsComponent } from './my-crop-bids.component';

describe('MyCropBidsComponent', () => {
  let component: MyCropBidsComponent;
  let fixture: ComponentFixture<MyCropBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCropBidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCropBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
