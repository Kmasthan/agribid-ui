import { Component } from '@angular/core';
import { FarmerDto } from '../entity/farmerDto';
import { MatDialogRef } from '@angular/material/dialog';
import { Environmet } from '../../../environments/environment';
@Component({
  selector: 'app-farmer-registration-model',
  standalone: false,
  templateUrl: './farmer-registration-model.component.html',
  styleUrl: './farmer-registration-model.component.css'
})
export class FarmerRegistrationModelComponent {

  private apiUrl = Environmet.apiUrl;

  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>) {

  }
  farmer: FarmerDto = new FarmerDto();

  onSubmitFarmerRegistration() {
    console.log(this.apiUrl);

    setTimeout(() => {
      this.dialogRef.close();
    }, 100);
  }

  resetFarmerRegistration() {
    this.farmer = new FarmerDto();
  }
}
