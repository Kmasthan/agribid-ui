import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BidDetailsDto } from './entity/bid-details-dto';

@Injectable({
  providedIn: 'root'
})
export class CropBiddingsService {

  constructor(private dataService: DataService) { }

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

  updateCropBidDetail(farmerId: string, cropId: string, newBidDetails: BidDetailsDto) {
    return this.dataService.updateObjectWithId(`buyer/update-bid/${farmerId}/${cropId}`, newBidDetails);
  }
}
