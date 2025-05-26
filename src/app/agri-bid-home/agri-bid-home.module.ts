import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidHomeRoutingModule } from './agri-bid-home-routing.module';
import { AgriBidHomePageComponent } from './agri-bid-home-page/agri-bid-home-page.component';
import { AgriBidHeaderComponent } from './agri-bid-header/agri-bid-header.component';


@NgModule({
  declarations: [AgriBidHomePageComponent, AgriBidHeaderComponent],
  imports: [
    CommonModule,
    AgriBidHomeRoutingModule
  ]
})
export class AgriBidHomeModule { }
