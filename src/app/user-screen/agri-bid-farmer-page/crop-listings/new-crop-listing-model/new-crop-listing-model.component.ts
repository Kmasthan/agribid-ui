import { Component, Inject } from '@angular/core';
import { CropListingsDto } from '../entity/crop-listing-dto';
import { CropListingsService } from '../crop-listings.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../../../local-storage.servive';
import { FarmerDto } from '../../../../agri-bid-home/entity/farmerDto';

@Component({
  selector: 'app-new-crop-listing-model',
  standalone: false,
  templateUrl: './new-crop-listing-model.component.html',
  styleUrl: './new-crop-listing-model.component.css'
})
export class NewCropListingModelComponent {

  newCrop: CropListingsDto = new CropListingsDto()
  farmer: FarmerDto = new FarmerDto();

  countrisList: string[] = [];
  statesList: string[] = [];
  districtsList: string[] = [];
  villagesList: string[] = [];
  measureProperties: string[] = ["Kg", "Lbs", "Tons"];
  qualityList: string[] = ["Excellent", "Good", "Average", "Below Average"];
  statusList: string[] = ["ACTIVE", "SOLD"];


  searchedCountry!: string;
  serachedState!: string;
  searchedDistrict!: string;
  searchedVillage!: string;
  responseMsg!: string;
  isResponseErr: boolean = false;
  editCropString!: string;
  isCropEditing: boolean = false;

  isSaveDisable: boolean = false;
  isUpdateDisable: boolean = false;

  constructor(private dialogRef: MatDialogRef<NewCropListingModelComponent>, private cropListingService: CropListingsService,
    @Inject(MAT_DIALOG_DATA) private data: any, private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.farmer = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;

    this.newCrop.measure = this.measureProperties[0];
    this.newCrop.quality = this.qualityList[0];
    this.newCrop.status = this.statusList[0];
    this.getCountriesList();
    if (this.data.editCrop) {
      this.isCropEditing = true;
      this.editCropString = JSON.stringify(this.data.editCrop);
      this.newCrop = this.data.editCrop;
    } else {
      this.isCropEditing = false;
    }
  }

  getCountriesList() {
    this.cropListingService.getCountries().subscribe({
      next: (data) => {
        this.countrisList = <string[]>data;
        if (!this.isCropEditing && this.countrisList && this.countrisList.length > 0) {
          this.newCrop.country = this.countrisList[0];
        }
      },
      error: (error) => {
        console.log(error.message);
        this.countrisList = [];
        this.statesList = [];
      },
      complete: () => {
        console.log("Success");
        this.getStatesList(this.newCrop.country);
      }
    })
  }

  getStatesList(country: string) {
    this.cropListingService.getStates(country).subscribe({
      next: (data) => {
        this.statesList = <string[]>data;
        if (!this.isCropEditing && this.statesList && this.statesList.length > 0) {
          this.newCrop.state = this.statesList[0];
        }
      },
      error: (error) => {
        console.log(error.message);
        this.statesList = [];
        this.districtsList = [];
      },
      complete: () => {
        console.log("Success");
        this.getDistrictsList(this.newCrop.country, this.newCrop.state);
      }
    })
  }

  getDistrictsList(country: string, state: string) {
    this.cropListingService.getDistricts(country, state).subscribe({
      next: (data) => {
        this.districtsList = <string[]>data;
        if (!this.isCropEditing && this.districtsList && this.districtsList.length > 0) {
          this.newCrop.district = this.districtsList[0];
        }
      },
      error: (error) => {
        console.log(error.message);
        this.districtsList = [];
        this.villagesList = [];
      },
      complete: () => {
        console.log("Success");
        this.getVillagesList(this.newCrop.country, this.newCrop.state, this.newCrop.district);
      }
    })
  }

  getVillagesList(country: string, state: string, district: string) {
    this.cropListingService.getVillages(country, state, district).subscribe({
      next: (data) => {
        this.villagesList = <string[]>data;
        if (!this.isCropEditing && this.villagesList && this.villagesList.length > 0) {
          this.newCrop.village = this.villagesList[0];
        }
      },
      error: (error) => {
        console.log(error);
        this.villagesList = [];
      },
      complete: () => {
        console.log("Success");

      }
    })
  }

  addNewCropToListings() {
    this.isSaveDisable = true;
    this.cropListingService.saveNewCropToListing(this.farmer, this.data.newCropPosition, this.newCrop).subscribe({
      next: (data) => {
        this.responseMsg = data.message;
        setTimeout(() => {
          this.closeAddNewCropFormModel(true);
        }, 1000)
      },
      error: (error) => {
        this.responseMsg = error.message;
        this.isResponseErr = true;
        this.isSaveDisable = false;
      },
      complete: () => { }
    })
  }

  updateCropInListing() {
    this.isUpdateDisable = true;
    this.cropListingService.updateCropInListing(this.farmer.id, this.newCrop).subscribe({
      next: (data) => {
        this.responseMsg = data.message;
        setTimeout(() => {
          this.closeAddNewCropFormModel(true);
        }, 1000)
      },
      error: (error) => {
        this.responseMsg = error.message;
        this.isResponseErr = true;
        this.isUpdateDisable = false;
      },
      complete: () => { }
    })
  }

  closeAddNewCropFormModel(isFormSubmitted: boolean) {
    let result = {
      "isFormSubmitted": isFormSubmitted,
      "crop": this.newCrop
    }
    this.dialogRef.close(result);
  }

  resetNewCropToListings() {
    if (this.isCropEditing) {
      this.newCrop = JSON.parse(this.editCropString);
    } else {
      this.newCrop = new CropListingsDto();
    }
  }
}
