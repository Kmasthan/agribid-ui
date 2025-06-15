import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropListingsService {

  countriesList: string[] = [];
  constructor(private dataService: DataService) { }

  getFarmerCropListings(farmerId: string) {
    const params = new HttpParams().set("farmerId", farmerId);
    return this.dataService.getObjects("farmer/get-crop-lisitngs", params);
  }

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
}
