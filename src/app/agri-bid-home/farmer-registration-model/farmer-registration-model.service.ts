import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { FarmerDto } from '../entity/farmerDto';

@Injectable({
  providedIn: 'root'
})
export class FarmerRegistrationModelService {

  constructor(private dataService: DataService) { }

  saveFarmerRegisterData(farmer: FarmerDto) {
    return  this.dataService.postData("user/save-farmer", farmer);
  }
}
