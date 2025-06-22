import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CropListingsService } from './crop-listings.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CropListingsDto } from './entity/crop-listing-dto';
import { FarmerDto } from '../../../agri-bid-home/entity/farmerDto';
import { LocalStorageService } from '../../../local-storage.servive';
import { MatDialog } from '@angular/material/dialog';
import { NewCropListingModelComponent } from './new-crop-listing-model/new-crop-listing-model.component';
import { DeleteCropListingConfirmationModelComponent } from './delete-crop-listing-confirmation-model/delete-crop-listing-confirmation-model.component';

@Component({
  selector: 'app-crop-listings',
  standalone: false,
  templateUrl: './crop-listings.component.html',
  styleUrl: './crop-listings.component.css'
})
export class CropListingsComponent implements AfterViewInit {

  displayedColumns: string[] = ['slNo', 'cropName', 'place', 'weight', 'quality', 'edit', 'delete'];
  dataSource: MatTableDataSource<CropListingsDto> = new MatTableDataSource<CropListingsDto>();

  user: FarmerDto = new FarmerDto();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cropListingService: CropListingsService, private localStorageService: LocalStorageService,
    private model: MatDialog) { }

  ngAfterViewInit() {
    // Ensure paginator is set after the view is initialized and data is available
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
        this.dataSource.data = data;
        // Reassign the paginator after the data is set
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error) => {
        console.error("Error fetching crop listings: ", error);
      },
      complete: () => {
        console.log("Fetching crop listings completed");
      }
    });
  }

  addNewCrop(editableCrop: any) {
    const dialogRef = this.model.open(NewCropListingModelComponent, {
      width: '600px',
      disableClose: true,
      data: {
        newCropPosition: this.dataSource.data.length + 1,
        editCrop: editableCrop
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.isFormSubmitted && result.crop) {
        // creating newOrUpdatedCrop of type CropListingsDto to store the result.crop
        let newOrUpdatedCrop = new CropListingsDto();
        newOrUpdatedCrop = result.crop;

        if (editableCrop) {
          // updating the crop in existing crop list
          let cropIndex = this.dataSource.data.findIndex(data => newOrUpdatedCrop.id == data.id);
          if (cropIndex != -1) {
            this.dataSource.data[cropIndex] = newOrUpdatedCrop;
          }
        } else {
          // adding the new crop to the existing crop list
          newOrUpdatedCrop.id = String(this.user.id + "-" + (this.dataSource.data.length + 1));
          this.dataSource.data.push(newOrUpdatedCrop);
        }
        // updating the paginator based on the changes in the data
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    });
  }

  editCrop(crop: CropListingsDto) {
    const editingCropString = JSON.stringify(crop);
    this.addNewCrop(JSON.parse(editingCropString));
  }

  deleteCrop(deleteCrop: CropListingsDto) {
    const dialogRef = this.model.open(DeleteCropListingConfirmationModelComponent, {
      width: '600px',
      disableClose: true,
      data: {
        farmerId: this.user.id,
        deleteCrop: deleteCrop
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      if (data.isCropDeleted) {
        // deleting the new crop to the existing crop list
        this.dataSource.data = this.dataSource.data.filter(crop => crop.id != data.deletedCropId);
        // updating the paginator based on the changes in the data
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    })
  }

}
