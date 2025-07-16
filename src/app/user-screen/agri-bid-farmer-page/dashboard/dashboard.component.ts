import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { LocalStorageService } from '../../../local-storage.servive';
import { FarmerDto } from '../../../agri-bid-home/entity/farmerDto';
import { error } from 'console';
import { CropBidsDto } from '../my-crop-bids/entity/crop-bids-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user: FarmerDto = new FarmerDto();

  cropsBidsDetails: CropBidsDto[] = [];
  selectedCropBuyerInfo: number = -1;

  constructor(private dashboardService: DashboardService, private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoggedInUser() != null ? JSON.parse(this.localStorageService.getLoggedInUser()!) : null;
    if (this.user && this.user.id) {
      this.getBiddedCropsForDashBoard(this.user.id)
    }
  }

  async getBiddedCropsForDashBoard(userId: string) {
    this.dashboardService.getBiddedCropsForDashBoard(userId).subscribe({
      next: (data) => {
        this.cropsBidsDetails = <CropBidsDto[]>data;
      },
      error: (error) => {
        console.log(error);

      },
      complete: () => { }
    })
  }

  showBuyerInfo(index: number) {
    if (this.selectedCropBuyerInfo == index) {
      this.selectedCropBuyerInfo = -1;
    } else {
      this.selectedCropBuyerInfo = index;
    }
  }

  goToMyCropBids(cropBid: CropBidsDto) {
    this.router.navigate(['user/farmer/my-crop-bids'], { queryParams: { cropDetails: JSON.stringify(cropBid.cropDetails) } })
  }
}
