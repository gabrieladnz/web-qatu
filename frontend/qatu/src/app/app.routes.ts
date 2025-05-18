// Libs
import { Routes } from '@angular/router';

// Components
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { SearchComponent } from './pages/search/search.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { SalesHistoryComponent } from './pages/sales-history/sales-history.component';
import { ClientAreaComponent } from './pages/client-area/client-area.component';
import { ProductSaleComponent } from './pages/product-sale/product-sale.component';

// Guards
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
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
        component: ProductViewComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'client',
        component: ClientAreaComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'purchases', pathMatch: 'full' },
            { path: 'purchases', component: PurchaseHistoryComponent },
            { path: 'sales', component: SalesHistoryComponent }
        ]
    },
    {
        path: 'sale/page',
        component: ProductSaleComponent
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];
