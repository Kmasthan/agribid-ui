import { Component, signal } from '@angular/core';
import { LoginDto } from '../entity/loginDto';
import { UserLoginPageModelService } from './user-login-page-model.service';
import { error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { FarmerDto } from '../entity/farmerDto';
import { BuyerDto } from '../entity/buyerDto';
import { LocalStorageService } from '../../local-storage.servive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-page-model',
  standalone: false,
  templateUrl: './user-login-page-model.component.html',
  styleUrl: './user-login-page-model.component.css'
})
export class UserLoginPageModelComponent {

  loginDto: LoginDto = new LoginDto();
  selectedUserType: string = "Farmer";
  showPassword: boolean = false;

  emailOrPhone!: string;
  password!: string;

  disableLogin: boolean = false;

  farmer: FarmerDto = new FarmerDto();
  buyer: BuyerDto = new BuyerDto();

  loginErrorMsg: string = '';

  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>, private userLoginPageService: UserLoginPageModelService,
    private localStorageService: LocalStorageService, private router: Router) { }

  userLogin() {
    this.disableLogin = true;
    this.loginDto.userType = this.selectedUserType.toUpperCase();
    this.userLoginPageService.getLoggedInUser(this.loginDto).subscribe({
      next: (data) => {
        this.closeLoginForm();
        this.localStorageService.setLoggedInUser(JSON.stringify(data))
          this.router.navigate(['/user']);
      },
      error: (error) => {
        this.loginErrorMsg = error.message;
        this.disableLogin = false;
      },
      complete: () => {
        console.log("User Login Succesfull");
      }
    })
  }

  closeLoginForm() {
    this.dialogRef.close();
  }
}
