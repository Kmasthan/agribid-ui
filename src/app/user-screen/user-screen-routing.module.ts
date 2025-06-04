import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserScreenComponent } from './user-screen.component';

const routes: Routes = [
  {
    path: '',
    component: UserScreenComponent,
    
      children: [
        {
          path: 'farmer',
          loadChildren: () => import('./agri-bid-farmer-page/agri-bid-farmer-page.module').then(m => m.AgriBidFarmerPageModule)
        },
        {
          path: 'buyer',
          loadChildren: () => import('./agri-bid-buyer-page/agri-bid-buyer-page.module').then(m => m.AgriBidBuyerPageModule)
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserScreenRoutingModule { }
