import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { BuyerDto } from '../entity/buyerDto';

@Injectable({
  providedIn: 'root'
})
export class BuyerRegistrationModelService {

  constructor(private dataService: DataService) { }

  saveBuyerRegisterData(buyer: BuyerDto) {
    return  this.dataService.postData("user/save-buyer", buyer);
  }
}
