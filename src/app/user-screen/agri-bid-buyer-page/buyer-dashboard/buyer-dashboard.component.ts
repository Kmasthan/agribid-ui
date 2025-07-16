import { Component } from '@angular/core';
import { BuyerDashboardBidsDto } from './entity/buyer-dashboard-bids-dto';
import { BuyerDashboardService } from './buyer-dashboard.service';
import { BuyerDto } from '../../../agri-bid-home/entity/buyerDto';
import { LocalStorageService } from '../../../local-storage.servive';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: false,
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {

  user: BuyerDto = new BuyerDto();
  bidDetailsList: BuyerDashboardBidsDto[] = []

  selectedBidCropInfo: number = -1;
  constructor(private buyerDashboardService: BuyerDashboardService, private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (this.user && this.user.id) {
      this.getBidsDetailsList(this.user.id);
    }
  }

  async getBidsDetailsList(userId: string) {
    this.buyerDashboardService.getUserBidsDetails(userId).subscribe({
      next: (data) => {
        this.bidDetailsList = <BuyerDashboardBidsDto[]>data;
      },
      error: (error) => { },
      complete: () => { }
    })
  }

  showCropInfo(index: number) {
    if (this.selectedBidCropInfo == index) {
      this.selectedBidCropInfo = -1;
    } else {
      this.selectedBidCropInfo = index;
    }
  }

  goToBidding(selectedBid: BuyerDashboardBidsDto) {
    this.router.navigate(['user/buyer/crop-bidding'], { queryParams: { cropDetails: JSON.stringify(selectedBid.cropDetails) } });
  }
}
