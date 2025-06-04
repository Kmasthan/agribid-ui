import { Component } from '@angular/core';
import { UserNavItems } from './entiry/user-navItems';
import { UserScreenService } from './user-screen.service';
import { LocalStorageService } from '../local-storage.servive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-screen',
  standalone: false,
  templateUrl: './user-screen.component.html',
  styleUrl: './user-screen.component.css'
})
export class UserScreenComponent {

  userNavItems: UserNavItems[] = [];

  constructor(private userScreenService: UserScreenService, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const loggedInUser = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (loggedInUser != null) {
      this.getLeftNavItemsForTheUser(loggedInUser.userType);
    }
  }

  getLeftNavItemsForTheUser(userType: string) {
    this.userScreenService.getUserLeftNavItems(userType).subscribe({
      next: (data) => {
        this.userNavItems = <UserNavItems[]>data;

        // setTimeout(() => {
          this.router.navigate([`user/${userType.toLowerCase()}`]);
        // }, 1000);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { }
    })
  }

}
