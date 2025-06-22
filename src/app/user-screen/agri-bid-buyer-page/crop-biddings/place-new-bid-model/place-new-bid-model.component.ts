import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CropsBiddingDto } from '../entity/crop-bidding-dto';
import { BidDetailsDto } from '../entity/bid-details-dto';
import { BuyerDto } from '../../../../agri-bid-home/entity/buyerDto';
import { LocalStorageService } from '../../../../local-storage.servive';
import { CropBiddingsService } from '../crop-biddings.service';
import { error } from 'console';

@Component({
  selector: 'app-place-new-bid-model',
  standalone: false,
  templateUrl: './place-new-bid-model.component.html',
  styleUrl: './place-new-bid-model.component.css'
})
export class PlaceNewBidModelComponent {
  biddingCrop: CropsBiddingDto = new CropsBiddingDto();
  user: BuyerDto = new BuyerDto()

  newBidDetails: BidDetailsDto = new BidDetailsDto();

  qualityList: string[] = ["Excellent", "Good", "Average", "Below Average"];
  measureProperties: string[] = ["Kg", "Lbs", "Tons"];

  currencyTypes: string[] = ["₹(Rupee)", "$(Doller)"];

  editingBidString!: string;
  isBidEditing: boolean = false;

  constructor(private dialogeRef: MatDialogRef<PlaceNewBidModelComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private localStorageService: LocalStorageService, private cropBiddingsService: CropBiddingsService) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;

    if (this.dialogData) {
      if (this.dialogData.selectedCrop) {
        this.dialogData.selectedCrop.cropData.weight = this.dialogData.selectedCrop.cropData.weight
        this.biddingCrop = this.dialogData.selectedCrop;
      }

      if (this.dialogData.editingBid) {
        this.editingBidString = JSON.stringify(this.dialogData.editingBid);
        this.newBidDetails = this.dialogData.editingBid;
        this.isBidEditing = true;
      } else {
        this.newBidDetails.biddingForTotalQuantity = true;
        this.newBidDetails.currency = this.currencyTypes[0];
        this.isBidEditing = false;
      }
    }
  }

  saveBid() {
    this.newBidDetails.buyerId = this.user.id;
    this.newBidDetails.buyerName = this.user.name;
    this.newBidDetails.buyerPhone = this.user.mobileNumber;
    this.newBidDetails.buyerEmail = this.user.email;

    if (this.newBidDetails.biddingForTotalQuantity) {
      this.newBidDetails.biddingQuantity = this.biddingCrop.cropData.weight;
      this.newBidDetails.measure = this.biddingCrop.cropData.measure;
    }

    this.cropBiddingsService.saveBidForCrop(this.biddingCrop.farmerId, this.biddingCrop.cropData.id, this.newBidDetails).subscribe({
      next: (data) => {
        console.log(data.message);
        setTimeout(() => {
          this.dialogeRef.close(this.newBidDetails);
        }, 1000)
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => { }
    })

  }

  editBit() {
    console.log(this.newBidDetails);
  }

  resetNewBid() {
    if (this.isBidEditing) {
      this.newBidDetails = JSON.parse(this.editingBidString);
    } else {
      this.newBidDetails = new BidDetailsDto();
      this.newBidDetails.biddingForTotalQuantity = true;
      this.newBidDetails.currency = this.currencyTypes[0];
    }
  }

  closeDialog() {
    this.dialogeRef.close();
  }

  enteredQuantityValidation(): number {
    if (this.newBidDetails.measure == this.biddingCrop.cropData.measure) {
      return this.biddingCrop.cropData.weight;
    } else if (this.biddingCrop.cropData.measure == "Tons") {
      if (this.newBidDetails.measure == "Lbs") {
        return this.tonsToLbsConvertion(this.biddingCrop.cropData.weight);
      }
      if (this.newBidDetails.measure == "Kg") {
        return this.tonsToKilogramsConvertion(this.biddingCrop.cropData.weight);
      }
    } else if (this.biddingCrop.cropData.measure == "Kg") {
      if (this.newBidDetails.measure == "Tons") {
        return this.kilogramsToTonsConvertion(this.biddingCrop.cropData.weight);
      }
      if (this.newBidDetails.measure == "Lbs") {
        return this.kilogramsToLbsConvertion(this.biddingCrop.cropData.weight);
      }
    } else {
      if (this.newBidDetails.measure == "Tons") {
        return this.lbsToTonsConvertion(this.biddingCrop.cropData.weight);
      }
      if (this.newBidDetails.measure == "Kg") {
        return this.lbsToKilogramsConvertion(this.biddingCrop.cropData.weight);
      }
    }
    return 0;
  }

  tonsToLbsConvertion(tonsValue: number): number {
    return tonsValue * 2000;
  }

  tonsToKilogramsConvertion(tonsValue: number): number {
    return tonsValue * 1000;
  }

  kilogramsToTonsConvertion(kilogramsValue: number): number {
    return kilogramsValue / 1000;
  }

  kilogramsToLbsConvertion(kilogramsValue: number): number {
    return kilogramsValue * 2.20;
  }

  lbsToTonsConvertion(lbsValue: number): number {
    return lbsValue / 2000;
  }

  lbsToKilogramsConvertion(lbsValue: number): number {
    return lbsValue / 2.20;
  }
}
