import { Routes } from '@angular/router';
import { UserScreenModule } from './user-screen/user-screen.module';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import("./agri-bid-home/agri-bid-home.module").then(m => m.AgriBidHomeModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user-screen/user-screen.module').then(m => UserScreenModule)
    }
];
