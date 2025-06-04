import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { LoginDto } from '../entity/loginDto';

@Injectable({
  providedIn: 'root'
})
export class UserLoginPageModelService {

  constructor(private dataService: DataService) { }

  getLoggedInUser(loginDto: LoginDto) {
    return this.dataService.postMethodToGetTheData("user/get-loggedin-user", loginDto);
  }
}
