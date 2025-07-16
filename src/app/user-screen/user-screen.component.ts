import { ChangeDetectorRef, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { UserNavItems } from './entity/user-navItems';
import { UserScreenService } from './user-screen.service';
import { LocalStorageService } from '../local-storage.servive';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LabelConstantsFactory } from '../label-constants/label-constant-factory';
import { LanguageSelectionService } from '../language-selection.service';
import { LabelConstants } from '../label-constants/label-constants';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-user-screen',
  standalone: false,
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent {

  userNavItems: UserNavItems[] = [];

  isSidebarOpen = false;
  isLargeScreen = true;

  isUserInfOpen = false;

  loggedInUser!: any | null;

  labelConstants!: LabelConstants;
  languageOptions: string[] = LabelConstantsFactory.getSupportedLanguages();
  selectedLanguage!: string;
  searchLanguageValue!: string;
  isShowLanguageSelection: boolean = true;

  constructor(private userScreenService: UserScreenService, private localStorageService: LocalStorageService,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private languageSelectionService: LanguageSelectionService,
    private cdr: ChangeDetectorRef, private sessionStorageService: SessionStorageService) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserInfo() {
    this.isUserInfOpen = !this.isUserInfOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth >= 768;
    if (this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }

  ngOnInit() {
    const languageInSessionStorage = this.sessionStorageService.getSelectedLanguage();
    if (languageInSessionStorage != null) {
      this.selectedLanguage = languageInSessionStorage;
    } else {
      this.selectedLanguage = LabelConstantsFactory.getSupportedLanguages()[0];
    }
    this.labelConstants = LabelConstantsFactory.getLabels(this.selectedLanguage);

    if (isPlatformBrowser(this.platformId)) {
      this.isLargeScreen = window.innerWidth >= 768;
    }

    this.loggedInUser = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (this.loggedInUser != null) {
      this.getLeftNavItemsForTheUser(this.loggedInUser.userType);
    }
  }

  getLeftNavItemsForTheUser(userType: string) {
    this.userScreenService.getUserLeftNavItems(userType).subscribe({
      next: (data) => {
        this.userNavItems = <UserNavItems[]>data;
        this.router.navigate([`user/${userType.toLowerCase()}`]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { }
    })
  }

  onLanguageSelection() {
    this.labelConstants = LabelConstantsFactory.getLabels(this.selectedLanguage!);
    this.setSelectedLabelToLanguageSelectionService(this.labelConstants);
    this.setSelectedLanguageToLanguageToSessionStorage(this.selectedLanguage!);
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

  setSelectedLanguageToLanguageToSessionStorage(selectedLanguage: string) {
    this.sessionStorageService.setSelectedLanguage(selectedLanguage);
  }

  @HostListener('document:click', ['$event'])
  OnClick(event: any) {
    if (event.target.id != 'userInfoCard' && event.target.id != 'userImageBlock'
      && event.target.id != 'userImage' && this.isUserInfOpen) {
      this.isUserInfOpen = false;
    }
  }

}
