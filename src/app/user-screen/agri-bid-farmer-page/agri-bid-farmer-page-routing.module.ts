import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropListingsComponent } from './crop-listings/crop-listings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"", redirectTo: 'dashboard', pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: 'crop-listings',
    component: CropListingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriBidFarmerPageRoutingModule { }
