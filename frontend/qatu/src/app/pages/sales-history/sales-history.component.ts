// Libs
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { ClientService } from '../../core/services/client/client.service';

// Interfaces
import { Order, SellerOrdersResponse } from '../../core/services/client/client.interface';

@Component({
    selector: 'app-sales-history',
    imports: [CommonModule],
    templateUrl: './sales-history.component.html',
    styleUrl: './sales-history.component.scss'
})
export class SalesHistoryComponent {
    protected sellers: Order[] = [];
    protected editingOrderId: string | null = null;
    protected isUpdating: boolean = false;
    protected showConfirmModal: boolean = false;
    protected confirmModalData: {
        orderId: string;
        newStatus: string;
        statusLabel: string;
    } | null = null;
    protected snackBar = inject(MatSnackBar);
    protected statusOptions = [
        { value: 'pending', label: 'Pendente', color: '#f59e0b' },
        { value: 'confirmed', label: 'Confirmado', color: '#28a745' },
        { value: 'shipped', label: 'Enviado', color: '#17a2b8' },
        { value: 'delivered', label: 'Entregue', color: '#28a745' },
        { value: 'cancelled', label: 'Cancelado', color: '#dc3545' }
    ];

    constructor(private clientService: ClientService) { }

    ngOnInit(): void {
        this.loadSellers();
    }

    protected async loadSellers(): Promise<void> {
        try {
            const response: SellerOrdersResponse = await this.clientService.getSellerOrders();
            this.sellers = response.orders;
        } catch (error) {
            console.error('Erro ao buscar lista de vendas:', error);
        }
    }

    protected startEditing(orderId: string): void {
        this.editingOrderId = orderId;
    }

    protected cancelEditing(): void {
        this.editingOrderId = null;
    }

    protected prepareStatusUpdate(orderId: string, newStatus: string): void {
        const currentOrder = this.sellers.find(order => order._id === orderId);
        if (currentOrder?.status === newStatus) {
            this.cancelEditing();
            return;
        }

        const statusLabel = this.getStatusLabel(newStatus);

        this.confirmModalData = {
            orderId,
            newStatus,
            statusLabel
        };

        this.showConfirmModal = true;
    }

    protected async confirmStatusUpdate(): Promise<void> {
        if (!this.confirmModalData) return;

        const { orderId, newStatus } = this.confirmModalData;

        this.isUpdating = true;
        this.closeConfirmModal();

        try {
            await this.clientService.updateOrderStatus(orderId, { status: newStatus });

            const orderIndex = this.sellers.findIndex(order => order._id === orderId);
            if (orderIndex !== -1) {
                this.sellers[orderIndex].status = newStatus;
            }

            this.cancelEditing();
        } catch (error) {
            this.snackBar.open('Erro ao atualizar o status.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        } finally {
            this.isUpdating = false;
        }
    }

    protected closeConfirmModal(): void {
        this.showConfirmModal = false;
        this.confirmModalData = null;
    }

    protected getStatusLabel(status: string): string {
        const statusOption = this.statusOptions.find(option => option.value === status);
        return statusOption?.label || status;
    }

    protected getStatusColor(status: string): string {
        const statusOption = this.statusOptions.find(option => option.value === status);
        return statusOption?.color || '#6b7280';
    }

    protected isEditing(orderId: string): boolean {
        return this.editingOrderId === orderId;
    }
}
