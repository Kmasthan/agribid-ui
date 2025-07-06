import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../local-storage.servive';
import { BuyerDto } from '../../../agri-bid-home/entity/buyerDto';
import { CropBiddingsService } from './crop-biddings.service';
import { error } from 'console';
import { CropsBiddingDto } from './entity/crop-bidding-dto';
import { MatDialog } from '@angular/material/dialog';
import { PlaceNewBidModelComponent } from './place-new-bid-model/place-new-bid-model.component';
import { BidDetailsDto } from './entity/bid-details-dto';
import { RegionDataService } from '../../region-data/region-data.service';
import { Router } from '@angular/router';
import { QuickChatDto } from '../../entity/quick-chat-dto';

@Component({
  selector: 'app-crop-biddings',
  standalone: false,
  templateUrl: './crop-biddings.component.html',
  styleUrl: './crop-biddings.component.css'
})
export class CropBiddingsComponent implements OnInit, OnDestroy {
  user: BuyerDto = new BuyerDto();

  countrisList: string[] = [];
  statesList: string[] = [];
  districtsList: string[] = [];
  villagesList: string[] = [];

  selectedCountry!: string;
  selectedState!: string;
  selectedDistrict!: string;
  selectedVillage!: string;

  searchedCountry!: string;
  serachedState!: string;
  searchedDistrict!: string;
  searchedVillage!: string;

  biddingCropsList: CropsBiddingDto[] = [];
  isShowBiddingForm: boolean = false;
  selectedCropForBidding: CropsBiddingDto = new CropsBiddingDto();
  isBidPlacedAlredy: boolean = false;
  selectedCropIndex!: number;

  cropBidsDetails: BidDetailsDto[] = [];

  intervalId: any;

  constructor(private localStorageService: LocalStorageService, private cropBiddingService: CropBiddingsService,
    private model: MatDialog, private regionDataService: RegionDataService, private router: Router
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    this.getCountriesList();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getCountriesList() {
    this.regionDataService.getCountries().subscribe({
      next: (data) => {
        this.countrisList = <string[]>data;
        if (this.countrisList && this.countrisList.length > 0) {
          this.selectedCountry = this.countrisList[0];
          this.getStatesList(this.selectedCountry);
        }
      },
      error: (error) => {
        this.countrisList = [];
        this.statesList = [];
        this.biddingCropsList = [];
        this.cropBidsDetails = [];
        this.isShowBiddingForm = false;
      },
      complete: () => {
      }
    })
  }

  getStatesList(country: string) {
    this.regionDataService.getStates(country).subscribe({
      next: (data) => {
        this.statesList = <string[]>data;
        if (this.statesList && this.statesList.length > 0) {
          this.selectedState = this.statesList[0];
          this.getDistrictsList(this.selectedCountry, this.selectedState);
        }
      },
      error: (error) => {
        this.statesList = [];
        this.districtsList = [];
        this.biddingCropsList = [];
        this.cropBidsDetails = [];
        this.isShowBiddingForm = false;
      },
      complete: () => {
      }
    })
  }

  getDistrictsList(country: string, state: string) {
    this.regionDataService.getDistricts(country, state).subscribe({
      next: (data) => {
        this.districtsList = <string[]>data;
        if (this.districtsList && this.districtsList.length > 0) {
          this.selectedDistrict = this.districtsList[0];
          this.getVillagesList(this.selectedCountry, this.selectedState, this.selectedDistrict);
        }
      },
      error: (error) => {
        this.districtsList = [];
        this.villagesList = [];
        this.biddingCropsList = [];
        this.cropBidsDetails = [];
        this.isShowBiddingForm = false;
      },
      complete: () => {
      }
    })
  }

  getVillagesList(country: string, state: string, district: string) {
    this.regionDataService.getVillages(country, state, district).subscribe({
      next: (data) => {
        this.villagesList = <string[]>data;
        if (this.villagesList && this.villagesList.length > 0 && !this.selectedVillage) {
          this.selectedVillage = this.villagesList[0];
        }
        this.getCropsForBidding(this.selectedCountry, this.selectedState, this.selectedDistrict, this.selectedVillage);
      },
      error: (error) => {
        this.villagesList = [];
        this.biddingCropsList = [];
        this.cropBidsDetails = [];
        this.isShowBiddingForm = false;
      },
      complete: () => { }
    })
  }

  getCropsForBidding(country: string, state: string, district: string, village: string) {
    this.selectedCropIndex = -1;
    this.cropBidsDetails = [];
    this.isShowBiddingForm = false;

    this.cropBiddingService.getCropsListForBidding(country, state, district, village).subscribe({
      next: (data) => {
        this.biddingCropsList = <CropsBiddingDto[]>data;
      },
      error: (error) => {
        this.biddingCropsList = [];
        this.isShowBiddingForm = false;
      },
      complete: () => { }
    })
  }

  viewOrPlaceBidForCrop(biddingCrop: CropsBiddingDto, selectedCropIndex: number) {
    this.selectedCropIndex = selectedCropIndex;
    this.isShowBiddingForm = true;
    this.selectedCropForBidding = biddingCrop;

    this.cropBiddingService.getCropBidsList(this.selectedCropForBidding.farmerId, this.selectedCropForBidding.cropData.id).subscribe({
      next: (data) => {
        this.cropBidsDetails = <BidDetailsDto[]>data;
        if (this.cropBidsDetails && this.cropBidsDetails.length > 0) {
          this.isBidPlacedAlredy = this.cropBidsDetails.some(bid => bid.buyerId == this.user.id);
        }
      },
      error: () => {
        this.cropBidsDetails = [];
        this.isBidPlacedAlredy = false;
      },
      complete: () => {
        this.startInterval();
      }
    })
  }

  placeYourBid(editingBid: any) {
    let minBidAmount = 0;
    if (this.cropBidsDetails.length > 0) {
      minBidAmount = this.cropBidsDetails[0].bidAmount;
    }
    const dialogRef = this.model.open(PlaceNewBidModelComponent, {
      width: '600px',
      disableClose: true,
      data: {
        "selectedCrop": this.selectedCropForBidding,
        "editingBid": editingBid,
        "minBidAmount": minBidAmount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newBid = new BidDetailsDto();
        newBid = result;
        const now = new Date();
        let dateString = now.getFullYear() + '-'
          + String(now.getMonth() + 1).padStart(2, '0') + '-'
          + String(now.getDate()).padStart(2, '0');

        if (editingBid) {
          const index = this.cropBidsDetails.findIndex(bid => bid.buyerId == this.user.id)
          if (index > -1) {
            this.cropBidsDetails[index] = newBid;
            newBid.modifiedAt = dateString;
          }
        } else {
          newBid.createdAt = dateString;
          this.isBidPlacedAlredy = true;
          this.cropBidsDetails.push(newBid);
        }
        this.cropBidsDetails.sort((bid1, bid2) => bid1.bidAmount - bid2.bidAmount).reverse();
      }
    })
  }

  editYourBid(bid: BidDetailsDto) {
    let editingBid = JSON.parse(JSON.stringify(bid));
    this.placeYourBid(editingBid);
  }

  quickChatWithFarmer(biddingCrop: CropsBiddingDto) {
    let chatDetails = new QuickChatDto();
    chatDetails.receverId = biddingCrop.farmerId;
    chatDetails.receverName = biddingCrop.farmerName;
    chatDetails.receverMobile = biddingCrop.farmerPhone;
    this.router.navigate(['user/buyer/quick-chat'], { queryParams: { chatDetails: JSON.stringify(chatDetails) } })
  }

  startInterval() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.viewOrPlaceBidForCrop(this.selectedCropForBidding, this.selectedCropIndex);
      }, 60000);
    }
  }
}
