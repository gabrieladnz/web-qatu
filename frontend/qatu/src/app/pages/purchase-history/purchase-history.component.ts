// Libs
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

// Interfaces
import { Order, OrderProduct, SellerOrdersResponse } from '../../core/services/client/client.interface';

// Services
import { ClientService } from '../../core/services/client/client.service';

// Components
import { ModalCreateReviewComponent } from '../../shared/components/modals/modal-create-review/modal-create-review.component';

registerLocaleData(localePt);

@Component({
    selector: 'app-purchase-history',
    imports: [CommonModule, MatIconModule],
    templateUrl: './purchase-history.component.html',
    styleUrl: './purchase-history.component.scss'
})
export class PurchaseHistoryComponent implements OnInit {
    protected orders: Order[] = [];
    protected statusOptions = [
        { value: 'pending', label: 'Pendente', color: '#f59e0b' },
        { value: 'confirmed', label: 'Confirmado', color: '#28a745' },
        { value: 'shipped', label: 'Enviado', color: '#17a2b8' },
        { value: 'delivered', label: 'Entregue', color: '#28a745' },
        { value: 'cancelled', label: 'Cancelado', color: '#dc3545' }
    ];

    constructor(private clientService: ClientService, private dialog: MatDialog) { }

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

    protected getStatusLabel(statusValue: string): string {
        const status = this.statusOptions.find(option => option.value === statusValue);
        return status ? status.label : statusValue;
    }

    protected openReviewModal(order: Order): void {
        order.products.forEach((item: OrderProduct) => {
            const dialogRef = this.dialog.open(ModalCreateReviewComponent, {
                data: {
                    productId: item.product._id,
                }
            });
        });
    }
}
