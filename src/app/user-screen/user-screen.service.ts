import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserScreenService {


  constructor(private dataService: DataService) { }

  getUserLeftNavItems(userType: string) {
    const params = new HttpParams().
      set('usertype', userType);
    return this.dataService.getObjects("user/user-left-nav-items", params);
  }
}
