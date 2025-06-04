import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { BuyerRegistrationModelComponent } from '../buyer-registration-model/buyer-registration-model.component';
import { UserLoginPageModelComponent } from '../user-login-page-model/user-login-page-model.component';
import { LocalStorageService } from '../../local-storage.servive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agri-bid-home-page',
  standalone: false,
  templateUrl: './agri-bid-home-page.component.html',
  styleUrl: './agri-bid-home-page.component.css'
})
export class AgriBidHomePageComponent {
  constructor(private model: MatDialog, private localStorageService: LocalStorageService, private router: Router) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.userLoggedInAlredy();
    }, 0);
  }

  /**
   * userLoggedInAlredy() is to navigate to user page directly, if logged in alredy based on LocalStorage
   */
  userLoggedInAlredy() {
    const loggedInUser = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (loggedInUser != null) {
      // this.router.navigate(['/user'])
    }
  }

  openFarmerRegistrationForm() {
    this.model.open(FarmerRegistrationModelComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
  }

  openBuyerRegistrationForm() {
    this.model.open(BuyerRegistrationModelComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
  }

  openUserLoginPage() {
    this.model.open(UserLoginPageModelComponent, {
      width: '500px',
      disableClose: true,
      data: {}
    })
  }
}
