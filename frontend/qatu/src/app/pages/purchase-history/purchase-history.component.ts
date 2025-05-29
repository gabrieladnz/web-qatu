// Libs
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Interfaces
import { Order, SellerOrdersResponse } from '../../core/services/client/client.interface';

// Services
import { ClientService } from '../../core/services/client/client.service';

registerLocaleData(localePt);

@Component({
    selector: 'app-purchase-history',
    imports: [CommonModule],
    templateUrl: './purchase-history.component.html',
    styleUrl: './purchase-history.component.scss'
})
export class PurchaseHistoryComponent implements OnInit {
    protected orders: Order[] = [];

    constructor(private clientService: ClientService) { }

    ngOnInit(): void {
        this.loadPurchaseHistory();
    }

    protected async loadPurchaseHistory(): Promise<void> {
        try {
            const response: SellerOrdersResponse = await this.clientService.getPurchasesOrders();
            this.orders = response.orders;
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        }
    }
}
