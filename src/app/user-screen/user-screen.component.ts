import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { UserNavItems } from './entiry/user-navItems';
import { UserScreenService } from './user-screen.service';
import { LocalStorageService } from '../local-storage.servive';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private userScreenService: UserScreenService, private localStorageService: LocalStorageService,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = event.target.innerWidth >= 768;
    if (this.isLargeScreen) {
      this.isSidebarOpen = false;
    }
  }

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.isLargeScreen = window.innerWidth >= 768;
    }

    const loggedInUser = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (loggedInUser != null) {
      this.getLeftNavItemsForTheUser(loggedInUser.userType);
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

}
