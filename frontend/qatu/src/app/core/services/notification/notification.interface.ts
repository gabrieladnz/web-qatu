export interface Notification {
    _id: string;
    user: string;
    role: 'buyer' | 'seller' | string;
    type: 'cart' | 'order' | string;
    message: string;
    read: boolean;
    createdAt: string;
    __v: number;
}

export interface ReadNotificationResponse {
    success: boolean;
    message: string;
    notification: Notification;
}
