import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidBuyerPageRoutingModule } from './agri-bid-buyer-page-routing.module';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { BuyerDashboardService } from './buyer-dashboard/buyer-dashboard.service';


@NgModule({
  declarations: [BuyerDashboardComponent],
  imports: [
    CommonModule,
    AgriBidBuyerPageRoutingModule
  ], 
  providers: [BuyerDashboardService]
})
export class AgriBidBuyerPageModule { }
