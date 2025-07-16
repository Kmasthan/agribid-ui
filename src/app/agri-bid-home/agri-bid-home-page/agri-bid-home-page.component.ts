import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FarmerRegistrationModelComponent } from '../farmer-registration-model/farmer-registration-model.component';
import { BuyerRegistrationModelComponent } from '../buyer-registration-model/buyer-registration-model.component';
import { UserLoginPageModelComponent } from '../user-login-page-model/user-login-page-model.component';
import { LocalStorageService } from '../../local-storage.servive';
import { Router } from '@angular/router';
import { LabelConstants } from '../../label-constants/label-constants';
import { LabelConstantsFactory } from '../../label-constants/label-constant-factory';
import { LanguageSelectionService } from '../../language-selection.service';
import { SessionStorageService } from '../../session-storage.service';

@Component({
  selector: 'app-agri-bid-home-page',
  standalone: false,
  templateUrl: './agri-bid-home-page.component.html',
  styleUrl: './agri-bid-home-page.component.css'
})
export class AgriBidHomePageComponent {

  labelConstants!: LabelConstants;

  languageOptions: string[] = LabelConstantsFactory.getSupportedLanguages();
  selectedLanguage: string = this.languageOptions[0];
  searchLanguageValue!: string;
  isShowLanguageSelection: boolean = true;

  constructor(private model: MatDialog, private localStorageService: LocalStorageService, private router: Router,
    private languageSelectionService: LanguageSelectionService, private sessionStorageService: SessionStorageService
  ) {

  }

  ngOnInit() {
    this.labelConstants = LabelConstantsFactory.getLabels(this.selectedLanguage);
    this.setSelectedLabelToLanguageSelectionService(this.labelConstants);
    this.setSelectedLanguageToSessionStorage(this.selectedLanguage);
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

  onLanguageSelection() {
    this.labelConstants = LabelConstantsFactory.getLabels(this.selectedLanguage);
    this.setSelectedLabelToLanguageSelectionService(this.labelConstants);
    this.setSelectedLanguageToSessionStorage(this.selectedLanguage);
    setTimeout(() => {
      this.onClickLanguageChnage()
    }, 200)
  }

  onClickLanguageChnage() {
    this.isShowLanguageSelection = !this.isShowLanguageSelection;
  }

  setSelectedLabelToLanguageSelectionService(labelConstants: LabelConstants) {
    this.languageSelectionService.setSelectedLabelConstant(labelConstants);
  }

  setSelectedLanguageToSessionStorage(selectedLanguage: string) {
    this.sessionStorageService.setSelectedLanguage(selectedLanguage);
  }
}
