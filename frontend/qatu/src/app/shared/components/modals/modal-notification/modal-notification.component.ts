// Libs
import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    inject
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
import { Notification } from '../../../../core/services/notification/notification.interface';

// Services
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
    selector: 'app-modal-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-notification.component.html',
    styleUrls: ['./modal-notification.component.scss'],
})
export class ModalNotificationComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() title: string = 'Notificações';
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
    @ViewChild('contentContainer') contentContainer!: ElementRef;

    protected notifications: Notification[] = [];
    protected isLoading = false;
    private scrollListener?: () => void;
    protected snackBar = inject(MatSnackBar);

    constructor(private notificationService: NotificationService) { }

    public async ngOnInit(): Promise<void> {
        await this.loadNotifications();
    }

    public ngAfterViewInit(): void {
        this.setupScrollListener();
    }

    public ngOnDestroy(): void {
        if (this.scrollListener && this.contentContainer?.nativeElement) {
            this.contentContainer.nativeElement.removeEventListener('scroll', this.scrollListener);
        }
    }

    private async loadNotifications(): Promise<void> {
        this.isLoading = true;
        try {
            this.notifications = await this.notificationService.getNotifications();
        } catch (error) {
            this.snackBar.open('Erro ao carregar notificações.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
            this.notifications = [];
        } finally {
            this.isLoading = false;
        }
    }

    private setupScrollListener(): void {
        if (!this.contentContainer?.nativeElement) return;

        this.scrollListener = () => {
            if (this.isLoading) return;

            const element = this.contentContainer.nativeElement;
            const atBottom =
                element.scrollHeight - element.scrollTop <= element.clientHeight + 50;

            if (atBottom) {
                this.loadMoreNotifications();
            }
        };

        this.contentContainer.nativeElement.addEventListener('scroll', this.scrollListener);
    }

    private loadMoreNotifications(): void {
        // TODO: Não há paginação no back, implementar depois
    }

    protected async markAsRead(notification: Notification): Promise<void> {
        if (notification.read) return;

        try {
            const response = await this.notificationService.markNotificationAsRead(notification._id);

            if (response.success && response.notification) {
                this.notifications = this.notifications.map((n) =>
                    n._id === notification._id ? response.notification : n
                );
            }
        } catch (error) {
            this.snackBar.open('Erro ao marcar notificação como lida.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        }
    }

    protected closeModal(): void {
        this.isOpen = false;
        setTimeout(() => this.close.emit(), 300);
    }

    protected async clearAllNotifications(): Promise<void> {
        try {
            await this.notificationService.clearAll();
            this.notifications = [];
        } catch (error) {
            this.snackBar.open('Erro ao remover notificações.', 'Fechar', {
                duration: 5000,
                panelClass: ['error-snackbar']
            });
        }
    }

    protected get notificationCount(): number {
        return this.notifications.length;
    }

    protected get unreadCount(): number {
        return this.notifications.filter(n => !n.read).length;
    }
}
