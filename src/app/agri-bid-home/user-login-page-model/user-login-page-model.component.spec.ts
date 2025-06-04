import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginPageModelComponent } from './user-login-page-model.component';

describe('UserLoginPageModelComponent', () => {
  let component: UserLoginPageModelComponent;
  let fixture: ComponentFixture<UserLoginPageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginPageModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginPageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
