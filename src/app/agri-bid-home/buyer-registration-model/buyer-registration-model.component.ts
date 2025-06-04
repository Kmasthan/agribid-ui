import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { BuyerRegistrationModelService } from './buyer-registration-model.service';
import { BuyerDto } from '../entity/buyerDto';
import { UserTypes } from '../entity/userTypes';

@Component({
  selector: 'app-buyer-registration-model',
  standalone: false,
  templateUrl: './buyer-registration-model.component.html',
  styleUrl: './buyer-registration-model.component.css'
})
export class BuyerRegistrationModelComponent {

  buyer: BuyerDto = new BuyerDto();
  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>, private buyerRegService: BuyerRegistrationModelService) { }

  onSubmitBuyerRegistration() {
    this.buyer.userType = UserTypes[UserTypes.BUYER];
    this.buyerRegService.saveBuyerRegisterData(this.buyer).subscribe({
      next: (data) => {
        console.log('Response:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.info('Registration completed successfully');
      }
    });

    setTimeout(() => {
      this.closeRegistrationModel();
    }, 100);
  }

  closeRegistrationModel() {
    this.dialogRef.close();
  }

  resetBuyerRegistration() {
    this.buyer = new BuyerDto();
  }
}
