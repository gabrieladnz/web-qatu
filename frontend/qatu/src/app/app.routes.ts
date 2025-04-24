// Libs
import { Routes } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            // TODO: Definir rota pra o componente de cadastro
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
