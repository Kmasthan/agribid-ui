import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./agri-bid-home/agri-bid-home.module").then(m => m.AgriBidHomeModule)
    }
];
