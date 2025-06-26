import { Component } from '@angular/core';
import { RegionDataService } from '../../region-data/region-data.service';
import { LocalStorageService } from '../../../local-storage.servive';
import { BuyerDto } from '../../../agri-bid-home/entity/buyerDto';
import { CropBidsDto } from './entity/crop-bids-dto';
import { MyCropBidsService } from './my-crop-bids.service';
import { FarmerDto } from '../../../agri-bid-home/entity/farmerDto';
import { error } from 'console';
import { BidDetailsDto } from '../../agri-bid-buyer-page/crop-biddings/entity/bid-details-dto';
import { MatDialog } from '@angular/material/dialog';
import { AcceptBidConfirmationModelComponent } from './accept-bid-confirmation-model/accept-bid-confirmation-model.component';

@Component({
  selector: 'app-my-crop-bids',
  standalone: false,
  templateUrl: './my-crop-bids.component.html',
  styleUrl: './my-crop-bids.component.css'
})
export class MyCropBidsComponent {

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

  user: FarmerDto = new FarmerDto();
  cropBidsList: CropBidsDto[] = [];
  latestBidData: BidDetailsDto = new BidDetailsDto();

  constructor(private myCropBidsService: MyCropBidsService, private regionDataService: RegionDataService, private localStorageService: LocalStorageService,
    private model: MatDialog
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : new FarmerDto();
    this.getCountriesList();
    setTimeout(() => {
      this.getBiddedCropsDetails();
    }, 1000)
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
      },
      error: (error) => {
        this.villagesList = [];
      },
      complete: () => { }
    })
  }

  onChangeVillage() {
    this.cropBidsList = [];
    this.getBiddedCropsDetails();
  }

  getBiddedCropsDetails() {
    this.myCropBidsService.getBiddedCrops(this.user.id, this.selectedCountry, this.selectedState, this.selectedDistrict, this.selectedVillage).subscribe({
      next: (data) => {
        this.cropBidsList = <CropBidsDto[]>data;
      },
      error: (error) => {
        this.cropBidsList = [];
      },
      complete: () => {

      }
    })
  }

  getLatestBid(bidIndex: number, cropId: string) {
    this.myCropBidsService.getLatestBidForTheCrop(this.user.id, cropId).subscribe({
      next: (data) => {
        this.latestBidData = <BidDetailsDto>data;
        if (this.latestBidData) {
          this.cropBidsList[bidIndex].bidDetails = this.latestBidData;
        }
      },
      error: (error) => { },
      complete: () => {
        this.latestBidData = new BidDetailsDto();
      }
    })
  }

  acceptBidForCrop(cropBid: CropBidsDto, cropBidIndex: number) {
    const dialogRef = this.model.open(AcceptBidConfirmationModelComponent, {
      width: '600px',
      disableClose: true,
      data: {
        "cropBid": cropBid,
        "farmerId": this.user.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isBidAccepted) {
        this.cropBidsList.splice(cropBidIndex, 1);
      }
    })
  }
}
