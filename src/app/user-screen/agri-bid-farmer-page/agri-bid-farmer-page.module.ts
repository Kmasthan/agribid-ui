import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidFarmerPageRoutingModule } from './agri-bid-farmer-page-routing.module';
import { CropListingsService } from './crop-listings/crop-listings.service';
import { CropListingsComponent } from './crop-listings/crop-listings.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [CropListingsComponent],
  imports: [
    CommonModule,
    AgriBidFarmerPageRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [CropListingsService]
})
export class AgriBidFarmerPageModule { }
