import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriBidHeaderComponent } from './agri-bid-header.component';

describe('AgriBidHeaderComponent', () => {
  let component: AgriBidHeaderComponent;
  let fixture: ComponentFixture<AgriBidHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriBidHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgriBidHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
