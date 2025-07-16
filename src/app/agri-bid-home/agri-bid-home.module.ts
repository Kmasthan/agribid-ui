import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidHomeRoutingModule } from './agri-bid-home-routing.module';
import { AgriBidHomePageComponent } from './agri-bid-home-page/agri-bid-home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FarmerRegistrationModelComponent } from './farmer-registration-model/farmer-registration-model.component';
import { FarmerRegistrationModelService } from './farmer-registration-model/farmer-registration-model.service';
import { BuyerRegistrationModelService } from './buyer-registration-model/buyer-registration-model.service';
import { BuyerRegistrationModelComponent } from './buyer-registration-model/buyer-registration-model.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserLoginPageModelComponent } from './user-login-page-model/user-login-page-model.component';
import { UserLoginPageModelService } from './user-login-page-model/user-login-page-model.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FiltersModule } from '../filters/filters.module';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [AgriBidHomePageComponent, FarmerRegistrationModelComponent, BuyerRegistrationModelComponent, UserLoginPageModelComponent],
  imports: [
    CommonModule,
    AgriBidHomeRoutingModule,
    MatDialogModule,
    FormsModule,
    MatButtonToggleModule,
    MatTooltip,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    FiltersModule
  ],
  providers: [FarmerRegistrationModelService, BuyerRegistrationModelService, UserLoginPageModelService]
})
export class AgriBidHomeModule { }
