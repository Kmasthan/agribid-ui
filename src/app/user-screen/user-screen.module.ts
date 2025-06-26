import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserScreenRoutingModule } from './user-screen-routing.module';
import { UserScreenComponent } from './user-screen.component';
import { AgriBidFarmerPageModule } from './agri-bid-farmer-page/agri-bid-farmer-page.module';
import { AgriBidBuyerPageModule } from './agri-bid-buyer-page/agri-bid-buyer-page.module';
import { RegionDataService } from './region-data/region-data.service';


@NgModule({
  declarations: [UserScreenComponent],
  imports: [
    CommonModule,
    UserScreenRoutingModule,
    AgriBidFarmerPageModule,
    AgriBidBuyerPageModule
  ],
  providers: [RegionDataService]
})
export class UserScreenModule { }
 