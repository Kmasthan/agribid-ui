import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriBidHomePageComponent } from './agri-bid-home-page.component';

describe('AgriBidHomePageComponent', () => {
  let component: AgriBidHomePageComponent;
  let fixture: ComponentFixture<AgriBidHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgriBidHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriBidHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
