import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BidDetailsDto } from './entity/bid-details-dto';

@Injectable({
  providedIn: 'root'
})
export class CropBiddingsService {
  countriesList: string[] = [];

  constructor(private dataService: DataService) { }

  getCountries(): Observable<string[]> {
    return new Observable((observable) => {
      if (this.countriesList && this.countriesList.length > 0) {
        observable.next(this.countriesList);
        observable.complete();
      } else {
        this.dataService.getObjectsWithPath("region-data/countries").subscribe({
          next: (data) => {
            this.countriesList = <string[]>data;
            observable.next(this.countriesList);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            observable.complete();
          }
        })
      }
    })
  }

  getStates(country: string) {
    return this.dataService.getObjectsWithPath(`region-data/states/${country}`);
  }

  getDistricts(country: string, state: string) {
    return this.dataService.getObjectsWithPath(`region-data/districts/${country}/${state}`)
  }

  getVillages(country: string, state: string, district: string) {
    return this.dataService.getObjectsWithPath(`region-data/villages/${country}/${state}/${district}`)
  }

  getCropsListForBidding(country: string, state: string, district: string, village: string) {
    const params = new HttpParams()
      .set("country", country)
      .set("state", state)
      .set("district", district)
      .set("village", village);
    return this.dataService.getObjects("buyer/bidding-crops", params);
  }

  saveBidForCrop(farmerId: string, cropId: string, newBidDetails: BidDetailsDto) {
    return this.dataService.postData(`buyer/new-bid/${farmerId}/${cropId}`, newBidDetails);
  }

  getCropBidsList(farmerId: string, cropId: string) {
    return this.dataService.getObjectsWithPath(`buyer/crop-bids/${farmerId}/${cropId}`);
  }
}
