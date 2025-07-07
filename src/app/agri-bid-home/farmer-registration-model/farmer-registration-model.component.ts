import { Component } from '@angular/core';
import { FarmerDto } from '../entity/farmerDto';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmerRegistrationModelService } from './farmer-registration-model.service';
import { UserTypes } from '../entity/userTypes';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../local-storage.servive';
import { SprinnerLoadingService } from '../../spinner-loading.service';
@Component({
  selector: 'app-farmer-registration-model',
  standalone: false,
  templateUrl: './farmer-registration-model.component.html',
  styleUrl: './farmer-registration-model.component.css'
})
export class FarmerRegistrationModelComponent {

  farmer: FarmerDto = new FarmerDto();

  registrationMsg!: string;
  isRegistrationError: boolean = false;

  profileImageUrl!: string | null;
  file!: any | null;

  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>, private farmerRegService: FarmerRegistrationModelService,
    private router: Router, private localStorageService: LocalStorageService, private spinnerLoadingService: SprinnerLoadingService
  ) { }

  onSubmitFarmerRegistration() {
    this.farmer.userType = UserTypes[UserTypes.FARMER];

    const formData = new FormData();
    formData.append("farmer", new Blob([JSON.stringify(this.farmer)], { type: 'application/json' }))
    formData.append("imageFile", this.file)

    this.farmerRegService.saveFarmerRegisterData(formData).subscribe({
      next: (response) => {
        // To show the success message in registration model
        this.isRegistrationError = false;
        this.registrationMsg = response.message;

        this.spinnerLoadingService.setLoading(true);
        setTimeout(() => {
          this.closeRegistrationModel();
          // To store the LoggedIn user in LocalStorage
          this.localStorageService.setLoggedInUser(JSON.stringify(response.data))
          // navigate to User page
          this.router.navigate(['/user']);
          this.spinnerLoadingService.setLoading(false);
        }, 3000);
      },
      error: (error) => {
        this.isRegistrationError = true;
        this.registrationMsg = error.message;
      },
      complete: () => {
        console.info('Registration completed successfully');
      }
    });
  }

  /**
   * On selecting the user profile image
   * @param event 
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  closeRegistrationModel() {
    this.dialogRef.close();
  }

  resetFarmerRegistration() {
    this.farmer = new FarmerDto();
    this.registrationMsg = '';
  }
}
