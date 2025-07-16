import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerRegistrationModelService {

  constructor(private dataService: DataService) { }

  saveBuyerRegisterData(formData: FormData) {
    return this.dataService.postData("user/save-buyer", formData);
  }
}
