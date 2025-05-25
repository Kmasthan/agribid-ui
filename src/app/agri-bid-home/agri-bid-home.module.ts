import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidHomeRoutingModule } from './agri-bid-home-routing.module';
import { AgriBidHomePageComponent } from './agri-bid-home-page/agri-bid-home-page.component';


@NgModule({
  declarations: [AgriBidHomePageComponent],
  imports: [
    CommonModule,
    AgriBidHomeRoutingModule
  ]
})
export class AgriBidHomeModule { }
