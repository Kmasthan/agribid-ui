import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CropBidsDto } from '../entity/crop-bids-dto';
import { CropListingsService } from '../../crop-listings/crop-listings.service';
import { FarmerDto } from '../../../../agri-bid-home/entity/farmerDto';
import { LocalStorageService } from '../../../../local-storage.servive';
import { CropListingsDto } from '../../crop-listings/entity/crop-listing-dto';
import { error } from 'console';

@Component({
  selector: 'app-accept-bid-confirmation-model',
  standalone: false,
  templateUrl: './accept-bid-confirmation-model.component.html',
  styleUrl: './accept-bid-confirmation-model.component.css'
})
export class AcceptBidConfirmationModelComponent {

  responseMsg!: string;
  isResponseError: boolean = false;
  acceptedCropBid: CropBidsDto = new CropBidsDto();
  farmerId!: string;

  user: FarmerDto = new FarmerDto();
  soldCrop: CropListingsDto = new CropListingsDto()

  constructor(private dialogRef: MatDialogRef<AcceptBidConfirmationModelComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private cropListingService: CropListingsService, private localStorageService: LocalStorageService) { }


  ngOnInit() {
    if (this.dialogData.cropBid) {
      this.acceptedCropBid = this.dialogData.cropBid;
    }
    if (this.dialogData.farmerId) {
      this.farmerId = this.dialogData.farmerId;
    } else {
      this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
      this.farmerId = this.user.id;
    }
  }

  acceptBid() {
    this.soldCrop = this.acceptedCropBid.cropDetails;
    this.soldCrop.status = "SOLD";
    this.cropListingService.updateCropInListing(this.farmerId, this.soldCrop).subscribe({
      next: (data) => {
        this.responseMsg = data.message;
      },
      error: (error) => {
        this.isResponseError = true;
        this.responseMsg = error.message;
      },
      complete: () => { }
    })
    setTimeout(() => {
      this.closeDialog(!this.isResponseError);
    }, 1000)
  }

  closeDialog(isBidAccepted: boolean) {
    let acceptedBidData = {
      "isBidAccepted": isBidAccepted
    }
    this.dialogRef.close(acceptedBidData);
  }
}
