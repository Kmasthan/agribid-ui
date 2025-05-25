import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriBidHomePageComponent } from './agri-bid-home-page/agri-bid-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: AgriBidHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriBidHomeRoutingModule { }
