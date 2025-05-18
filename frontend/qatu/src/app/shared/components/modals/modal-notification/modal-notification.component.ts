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
} from '@angular/core';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
    selector: 'app-modal-notification',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-notification.component.html',
    styleUrls: ['./modal-notification.component.scss'],
})
export class ModalNotificationComponent implements OnInit, AfterViewInit {
    @Input() title: string = 'Notificações';
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
    @ViewChild('contentContainer') contentContainer!: ElementRef;

    public notifications: any[] = [];
    public isLoading = false;

    constructor(public notificationService: NotificationService) {} 

    ngOnInit(): void {
        this.notificationService.notifications$.subscribe((notifs) => {
            this.notifications = notifs;
            this.isLoading = false;
        });
    }

    ngAfterViewInit(): void {
        this.setupScrollListener();
    }

    private setupScrollListener(): void {
        this.contentContainer.nativeElement.addEventListener('scroll', () => {
            if (this.isLoading || !this.notificationService.hasMore()) return;

            const element = this.contentContainer.nativeElement;
            const atBottom =
                element.scrollHeight - element.scrollTop <=
                element.clientHeight + 50;

            if (atBottom) {
                this.loadMoreNotifications();
            }
        });
    }

    private loadMoreNotifications(): void {
        this.isLoading = true;
        this.notificationService.loadMore();
    }

    public closeModal(): void {
        this.isOpen = false;
        setTimeout(() => this.close.emit(), 300);
    }

    public clearAllNotifications(): void {
        this.notificationService.clearAll();
    }

    public markAsRead(id: number): void {
        this.notificationService.markAsRead(id);
    }

    public trackById(index: number, item: any): number {
        return item.id;
    }

    get notificationCount$() {
    return this.notificationService.totalNotifications$;
  }
}
