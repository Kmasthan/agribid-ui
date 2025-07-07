import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerRegistrationModelService {

  constructor(private dataService: DataService) { }

  saveFarmerRegisterData(formData: FormData) {
    return this.dataService.postData("user/save-farmer", formData);
  }
}
