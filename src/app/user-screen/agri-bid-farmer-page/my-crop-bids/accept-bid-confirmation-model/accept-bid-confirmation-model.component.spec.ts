import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptBidConfirmationModelComponent } from './accept-bid-confirmation-model.component';

describe('AcceptBidConfirmationModelComponent', () => {
  let component: AcceptBidConfirmationModelComponent;
  let fixture: ComponentFixture<AcceptBidConfirmationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptBidConfirmationModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptBidConfirmationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
