// Libs
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Services
import { TokenService } from '../token/token.service';
import { ApiService } from '../../api/api.service';

// Interfaces
import { Notification, ReadNotificationResponse } from './notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService extends ApiService {
    constructor(private tokenService: TokenService, protected override http: HttpClient) {
        super(http);
    }

    public async getNotifications(): Promise<Notification[]> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.get<Notification[]>('notifications', {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
                notifications: []
            };

            throw errorResponse;
        }
    }

    public async markNotificationAsRead(notificationId: string): Promise<ReadNotificationResponse> {
        try {
            const token = this.tokenService.get() ?? undefined;

            return await lastValueFrom(
                this.patch<ReadNotificationResponse>(`notifications/${notificationId}/read`, {}, token)
            );
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error,
                notification: {} as Notification
            };

            throw errorResponse;
        }
    }

    public async clearAll(): Promise<{ success: boolean; message: string }> {
        try {
            const token = this.tokenService.get() ?? undefined;

            const response = await lastValueFrom(
                this.delete<{ message: string }>('notifications', {}, token)
            );

            return {
                success: true,
                message: response.message
            };
        } catch (error) {
            const errorResponse = {
                success: false,
                message: error instanceof Error ? error.message : String(error)
            };

            throw errorResponse;
        }
    }
}
