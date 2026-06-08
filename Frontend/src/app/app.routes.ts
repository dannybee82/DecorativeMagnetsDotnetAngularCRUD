import { Routes } from '@angular/router';
import { AllDecorativeMagnets } from './pages/all-decorative-magnets/all-decorative-magnets';
import { DetailsDecorativeMagnet } from './pages/details-decorative-magnet/details-decorative-magnet';
import { CreateOrUpdateDecorativeMagnets } from './pages/create-or-update-decorative-magnets/create-or-update-decorative-magnets';
import { Layout } from './layout/layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
             {
                path: '',
                component: AllDecorativeMagnets
            },
            {
                path: 'details/:id',
                component: DetailsDecorativeMagnet
            },
            {
                path: 'create-or-update/:id',
                component: CreateOrUpdateDecorativeMagnets
            }
        ]
    }   
];