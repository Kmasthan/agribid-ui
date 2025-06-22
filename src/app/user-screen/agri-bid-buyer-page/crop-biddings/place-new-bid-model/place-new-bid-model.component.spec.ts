import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceNewBidModelComponent } from './place-new-bid-model.component';

describe('PlaceNewBidModelComponent', () => {
  let component: PlaceNewBidModelComponent;
  let fixture: ComponentFixture<PlaceNewBidModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceNewBidModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceNewBidModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
