import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { CropBiddingsComponent } from './crop-biddings/crop-biddings.component';

const routes: Routes = [
  {
    path:"", redirectTo: 'dashboard', pathMatch: "full"
  },
  {
    path: "dashboard",
    component: BuyerDashboardComponent
  },
  {
    path: "crop-bidding",
    component: CropBiddingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriBidBuyerPageRoutingModule { }
