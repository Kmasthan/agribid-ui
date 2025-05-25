import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./agri-bid-home/agri-bid-home.module").then(m => m.AgriBidHomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import("./agri-bid-login-or-sign-up/agri-bid-login-or-sign-up.module").then(m => m.AgriBidLoginOrSignUpModule)
      }
];
