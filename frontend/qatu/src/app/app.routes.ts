// Libs
import { Routes } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ],
    },
    {
        path: 'product/:id',
        component: ProductViewComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
