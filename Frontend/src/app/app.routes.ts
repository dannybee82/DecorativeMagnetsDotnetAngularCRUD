import { Routes } from '@angular/router';
import { AllDecorativeMagnetsComponent } from './pages/all-decorative-magnets/all-decorative-magnets.component';
import { DetailsDecorativeMagnetComponent } from './pages/details-decorative-magnet/details-decorative-magnet.component';
import { CreateOrUpdateDecorativeMagnetsComponent } from './pages/create-or-update-decorative-magnets/create-or-update-decorative-magnets.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
             {
                path: '',
                component: AllDecorativeMagnetsComponent
            },
            {
                path: 'details/:id',
                component: DetailsDecorativeMagnetComponent
            },
            {
                path: 'create-or-update/:id',
                component: CreateOrUpdateDecorativeMagnetsComponent
            }
        ]
    }   
];