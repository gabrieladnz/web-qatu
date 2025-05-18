import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_NOTIFICATIONS } from './mock-notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private allNotifications = [...MOCK_NOTIFICATIONS];
    private displayedNotifications = new BehaviorSubject<any[]>([]);
    private _totalNotifications = new BehaviorSubject<number>(
        this.allNotifications.length
    );
    private currentPage = 0;
    private readonly pageSize = 10;

    public totalNotifications$ = this._totalNotifications.asObservable();
    public notifications$ = this.displayedNotifications.asObservable();

    constructor() {
        this.loadMore();
    }

    public loadMore() {
        const startIdx = this.currentPage * this.pageSize;
        const newNotifications = this.allNotifications.slice(
            startIdx,
            startIdx + this.pageSize
        );

        this.currentPage++;
        this.displayedNotifications.next([
            ...this.displayedNotifications.value,
            ...newNotifications,
        ]);
    }

    public hasMore(): boolean {
        return this.currentPage * this.pageSize < this.allNotifications.length;
    }

    public markAsRead(id: number): void {
        const updated = this.allNotifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
        );
        this.allNotifications = updated;
        this.displayedNotifications.next(
            updated.slice(0, this.currentPage * this.pageSize)
        );
    }

    public clearAll(): void {
        this.allNotifications = [];
        this._totalNotifications.next(0);
        this.displayedNotifications.next([]);
        this.currentPage = 0;
    }
}
