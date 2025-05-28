import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { BuyerRegistrationModelComponent } from '../buyer-registration-model/buyer-registration-model.component';

@Component({
  selector: 'app-agri-bid-home-page',
  standalone: false,
  templateUrl: './agri-bid-home-page.component.html',
  styleUrl: './agri-bid-home-page.component.css'
})
export class AgriBidHomePageComponent {
  constructor(private model: MatDialog) {

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
}
