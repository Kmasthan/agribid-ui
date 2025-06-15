import { Component } from '@angular/core';
import { CropListings } from '../../entity/crop-listing-dto';
import { CropListingsService } from '../crop-listings.service';
import { error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-crop-listing-model',
  standalone: false,
  templateUrl: './new-crop-listing-model.component.html',
  styleUrl: './new-crop-listing-model.component.css'
})
export class NewCropListingModelComponent {

  newCrop: CropListings = new CropListings()

  countrisList: string[] = [];
  statesList: string[] = [];
  districtsList: string[] = [];
  villagesList: string[] = [];

  searchedCountry!: string;
  serachedState!: string;
  searchedDistrict!: string;
  searchedVillage!: string;

  constructor(private dialogRef: MatDialogRef<NewCropListingModelComponent>, private cropListingService: CropListingsService) { }

  ngOnInit() {
    this.getCountriesList();
  }

  getCountriesList() {
    this.cropListingService.getCountries().subscribe({
      next: (data) => {
        this.countrisList = <string[]>data;
        if (this.countrisList && this.countrisList.length > 0) {
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
        if (this.statesList && this.statesList.length > 0) {
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
        if (this.districtsList && this.districtsList.length > 0) {
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
        if (this.villagesList && this.villagesList.length > 0) {
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
    console.log(this.newCrop);
    console.log(this.searchedCountry);
  }

  closeAddNewCropFormModel() {
    this.dialogRef.close();
  }
}
