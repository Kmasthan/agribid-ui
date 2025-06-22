import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CropListingsDto } from '../entity/crop-listing-dto';
import { CropListingsService } from '../crop-listings.service';

@Component({
  selector: 'app-delete-crop-listing-confirmation-model',
  standalone: false,
  templateUrl: './delete-crop-listing-confirmation-model.component.html',
  styleUrl: './delete-crop-listing-confirmation-model.component.css'
})
export class DeleteCropListingConfirmationModelComponent {
  deletingCrop: CropListingsDto = new CropListingsDto();
  responseMsg!: string;
  isResponseError: boolean = false;

  constructor(private dialogRef: MatDialogRef<DeleteCropListingConfirmationModelComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private cropListingService: CropListingsService) { }


  ngOnInit() {
    if (this.dialogData.deleteCrop) {
      this.deletingCrop = this.dialogData.deleteCrop;
    }
  }

  deleteCrop() {
    this.cropListingService.deleteCropFromListing(this.dialogData.farmerId, this.deletingCrop.id).subscribe({
      next: (response) => {
        this.responseMsg = response.message;
        this.isResponseError = false;
      },
      error: (error) => {
        this.responseMsg = error.message;
        this.isResponseError = true;
      },
      complete: () => { "deleteCrop() execution success" }
    })
    setTimeout(() => {
      this.closeDialog(true);
    }, 1000)
  }
  
  closeDialog(isCropDeleted: boolean) {
    let deletedcropData = {
      "deletedCropId": this.deletingCrop.id,
      "isCropDeleted": isCropDeleted
    }
    this.dialogRef.close(deletedcropData);
  }
}
