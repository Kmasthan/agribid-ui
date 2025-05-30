import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidHomeRoutingModule } from './agri-bid-home-routing.module';
import { AgriBidHomePageComponent } from './agri-bid-home-page/agri-bid-home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FarmerRegistrationModelComponent } from './farmer-registration-model/farmer-registration-model.component';
import { FarmerRegistrationModelService } from './farmer-registration-model/farmer-registration-model.service';



@NgModule({
  declarations: [AgriBidHomePageComponent, FarmerRegistrationModelComponent],
  imports: [
    CommonModule,
    AgriBidHomeRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [FarmerRegistrationModelService]
})
export class AgriBidHomeModule { }
