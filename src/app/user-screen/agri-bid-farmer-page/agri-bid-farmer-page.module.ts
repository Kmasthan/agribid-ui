import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidFarmerPageRoutingModule } from './agri-bid-farmer-page-routing.module';
import { CropListingsService } from './crop-listings/crop-listings.service';
import { CropListingsComponent } from './crop-listings/crop-listings.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewCropListingModelComponent } from './crop-listings/new-crop-listing-model/new-crop-listing-model.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FiltersModule } from '../../filters/filters.module';
import { DeleteCropListingConfirmationModelComponent } from './crop-listings/delete-crop-listing-confirmation-model/delete-crop-listing-confirmation-model.component';
import { MyCropBidsComponent } from './my-crop-bids/my-crop-bids.component';
import { MyCropBidsService } from './my-crop-bids/my-crop-bids.service';
import { MatCardModule } from '@angular/material/card'
import { AcceptBidConfirmationModelComponent } from './my-crop-bids/accept-bid-confirmation-model/accept-bid-confirmation-model.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { MatTooltip } from '@angular/material/tooltip';



@NgModule({
  declarations: [DashboardComponent, CropListingsComponent, NewCropListingModelComponent, DeleteCropListingConfirmationModelComponent,
    MyCropBidsComponent, AcceptBidConfirmationModelComponent
  ],
  imports: [
    CommonModule,
    AgriBidFarmerPageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxMatSelectSearchModule,
    FiltersModule,
    MatCardModule,
    MatTooltip
  ],
  providers: [DashboardService, CropListingsService, MyCropBidsService]
})
export class AgriBidFarmerPageModule { }
