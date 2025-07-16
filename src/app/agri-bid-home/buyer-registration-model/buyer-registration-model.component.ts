import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { BuyerRegistrationModelService } from './buyer-registration-model.service';
import { BuyerDto } from '../entity/buyerDto';
import { UserTypes } from '../entity/userTypes';
import { LocalStorageService } from '../../local-storage.servive';
import { Router } from '@angular/router';
import { SprinnerLoadingService } from '../../spinner-loading.service';
import { LabelConstants } from '../../label-constants/label-constants';
import { LanguageSelectionService } from '../../language-selection.service';

@Component({
  selector: 'app-buyer-registration-model',
  standalone: false,
  templateUrl: './buyer-registration-model.component.html',
  styleUrl: './buyer-registration-model.component.css'
})
export class BuyerRegistrationModelComponent {

  buyer: BuyerDto = new BuyerDto();

  registrationMessage!: string;
  isRegistrationError: boolean = false;

  profileImageUrl!: string | null;
  file!: any | null;

  labelConstants!: LabelConstants;

  constructor(private dialogRef: MatDialogRef<FarmerRegistrationModelComponent>, private buyerRegService: BuyerRegistrationModelService,
    private localStorageService: LocalStorageService, private router: Router, private spinnerLoadingService: SprinnerLoadingService,
    private languageSelectionService: LanguageSelectionService, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.languageSelectionService.getSelectedLabels$.subscribe((labels) => {
      this.labelConstants = labels;
      this.cdr.detectChanges();
    });
  }

  onSubmitBuyerRegistration() {
    this.buyer.userType = UserTypes[UserTypes.BUYER];

    const formData = new FormData();
    formData.append("buyer", new Blob([JSON.stringify(this.buyer)], { type: 'application/json' }))
    formData.append("imageFile", this.file)

    this.buyerRegService.saveBuyerRegisterData(formData).subscribe({
      next: (response) => {
        // To show the success message in registration model
        this.isRegistrationError = false;
        this.registrationMessage = response.message;

        this.spinnerLoadingService.setLoading(true);
        setTimeout(() => {
          this.closeRegistrationModel();
          // To store the LoggedIn user in LocalStorage
          this.localStorageService.setLoggedInUser(JSON.stringify(response.data));
          // navigate to User page
          this.router.navigate(['/user']);
          this.spinnerLoadingService.setLoading(false);
        }, 3000)
      },
      error: (error) => {
        this.isRegistrationError = true;
        this.registrationMessage = error.message;
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

  resetBuyerRegistration() {
    this.buyer = new BuyerDto();
  }
}
