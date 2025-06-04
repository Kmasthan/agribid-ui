import { Component, ViewChild } from '@angular/core';
import { CropListingsService } from './crop-listings.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CropListings } from '../entity/crop-listing-dto';
import { FarmerDto } from '../../../agri-bid-home/entity/farmerDto';
import { LocalStorageService } from '../../../local-storage.servive';

@Component({
  selector: 'app-crop-listings',
  standalone: false,
  templateUrl: './crop-listings.component.html',
  styleUrl: './crop-listings.component.css'
})
export class CropListingsComponent {

  displayedColumns: string[] = ['slNo', 'cropName', 'weight', 'quality'];
  dataSource: MatTableDataSource<CropListings> = new MatTableDataSource<CropListings>();

  user: FarmerDto = new FarmerDto();

  constructor(private cropListingService: CropListingsService, private localStorageService: LocalStorageService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (this.user && this.user.id) {
      this.getFarmerCropListings(this.user.id);
    }
  }

  getFarmerCropListings(farmerIdd: string) {
    this.cropListingService.getFarmerCropListings(farmerIdd).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<CropListings>(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

      }
    })
  }

}

