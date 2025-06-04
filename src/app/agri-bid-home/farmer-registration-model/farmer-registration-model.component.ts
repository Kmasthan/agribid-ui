import { Component } from '@angular/core';
import { FarmerDto } from '../entity/farmerDto';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmerRegistrationModelService } from './farmer-registration-model.service';
import { UserTypes } from '../entity/userTypes';
@Component({
  selector: 'app-farmer-registration-model',
  standalone: false,
  templateUrl: './farmer-registration-model.component.html',
  styleUrl: './farmer-registration-model.component.css'
})
export class FarmerRegistrationModelComponent {

  farmer: FarmerDto = new FarmerDto();
  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>, private farmerRegService: FarmerRegistrationModelService) { }

  onSubmitFarmerRegistration() {
    this.farmer.userType = UserTypes[UserTypes.FARMER];
    this.farmerRegService.saveFarmerRegisterData(this.farmer).subscribe({
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

  resetFarmerRegistration() {
    this.farmer = new FarmerDto();
  }
}
