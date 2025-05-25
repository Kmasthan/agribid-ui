import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriBidLoginOrSignUpPageComponent } from './agri-bid-login-or-sign-up-page/agri-bid-login-or-sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: AgriBidLoginOrSignUpPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriBidLoginOrSignUpRoutingModule { }
