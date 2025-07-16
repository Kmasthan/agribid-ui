import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserScreenRoutingModule } from './user-screen-routing.module';
import { UserScreenComponent } from './user-screen.component';
import { AgriBidFarmerPageModule } from './agri-bid-farmer-page/agri-bid-farmer-page.module';
import { AgriBidBuyerPageModule } from './agri-bid-buyer-page/agri-bid-buyer-page.module';
import { RegionDataService } from './region-data/region-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTooltip } from '@angular/material/tooltip';
import { FiltersModule } from '../filters/filters.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserScreenComponent],
  imports: [
    CommonModule,
    UserScreenRoutingModule,
    AgriBidFarmerPageModule,
    AgriBidBuyerPageModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTooltip,
    FiltersModule,
    FormsModule
  ],
  providers: [RegionDataService]
})
export class UserScreenModule { }
