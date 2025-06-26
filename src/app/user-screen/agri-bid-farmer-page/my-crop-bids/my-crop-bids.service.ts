import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyCropBidsService {

  constructor(private dataService: DataService) { }

  getBiddedCrops(farmerId: string, selectedCountry: string, selectedState: string, selectedDistrict: string, selectedVillage: string) {
    const params = new HttpParams()
      .set("country", selectedCountry).set("state", selectedState)
      .set("district", selectedDistrict).set("village", selectedVillage);
    return this.dataService.getObjects(`farmer/get-bidded-crops/${farmerId}`, params);
  }

  getLatestBidForTheCrop(farmerId: string, cropId: string) {
    return this.dataService.getObjectsWithPath(`farmer/get-latest-bid-for-crop/${farmerId}/${cropId}`);
  }
}
