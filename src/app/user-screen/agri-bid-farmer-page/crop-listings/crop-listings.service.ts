import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropListingsService {

  constructor(private dataService: DataService) { }

  getFarmerCropListings(farmerId: string) {
    const params = new HttpParams().set("farmerId", farmerId);
    return this.dataService.getObjects("farmer/get-crop-lisitngs", params);
  }
}
