import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidBuyerPageRoutingModule } from './agri-bid-buyer-page-routing.module';
import { BuyerDashboardComponent } from './buyer-dashboard/buyer-dashboard.component';
import { BuyerDashboardService } from './buyer-dashboard/buyer-dashboard.service';
import { CropBiddingsComponent } from './crop-biddings/crop-biddings.component';
import { FiltersModule } from '../../filters/filters.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CropBiddingsService } from './crop-biddings/crop-biddings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PlaceNewBidModelComponent } from './crop-biddings/place-new-bid-model/place-new-bid-model.component';
import { MatRadioModule } from '@angular/material/radio'
import { MatTooltip } from '@angular/material/tooltip';


@NgModule({
  declarations: [BuyerDashboardComponent, CropBiddingsComponent, PlaceNewBidModelComponent],
  imports: [
    CommonModule,
    AgriBidBuyerPageRoutingModule,
    FiltersModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatRadioModule,
    MatTooltip
  ], 
  providers: [BuyerDashboardService, CropBiddingsService]
})
export class AgriBidBuyerPageModule { }
