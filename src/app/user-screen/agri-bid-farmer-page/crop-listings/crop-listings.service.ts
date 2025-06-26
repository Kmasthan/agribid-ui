import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmerDto } from '../../../agri-bid-home/entity/farmerDto';
import { CropListingsDto } from './entity/crop-listing-dto';

@Injectable({
  providedIn: 'root'
})
export class CropListingsService {
  constructor(private dataService: DataService) { }

  getFarmerCropListings(farmerId: string) {
    const params = new HttpParams().set("farmerId", farmerId);
    return this.dataService.getObjects("farmer/get-crop-lisitngs", params);
  }

  saveNewCropToListing(farmer: FarmerDto, newCropPosition: number, newCrop: CropListingsDto) {
    const params = new HttpParams()
      .set("farmerId", farmer.id).set("farmerName", farmer.name)
      .set("farmerPhone", farmer.mobileNumber).set("farmerEmail", farmer.email)
      .set("newCropPosition", newCropPosition);

    return this.dataService.postData("farmer/new-crop-listing?" + params, newCrop);
  }

  deleteCropFromListing(farmerId: any, cropId: string) {
    return this.dataService.deleteObjectWithId(`farmer/delete-crop/${farmerId}/${cropId}`)
  }

  updateCropInListing(farmerId: string, updateCrop: CropListingsDto) {
    return this.dataService.updateObjectWithId(`farmer/update-crop/${farmerId}/${updateCrop.id}`, updateCrop);
  }
}
