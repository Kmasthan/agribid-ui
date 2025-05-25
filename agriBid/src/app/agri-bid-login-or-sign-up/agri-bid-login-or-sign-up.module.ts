import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgriBidLoginOrSignUpRoutingModule } from './agri-bid-login-or-sign-up-routing.module';
import { AgriBidLoginOrSignUpPageComponent } from './agri-bid-login-or-sign-up-page/agri-bid-login-or-sign-up-page.component';


@NgModule({
  declarations: [AgriBidLoginOrSignUpPageComponent],
  imports: [
    CommonModule,
    AgriBidLoginOrSignUpRoutingModule
  ]
})
export class AgriBidLoginOrSignUpModule { }
