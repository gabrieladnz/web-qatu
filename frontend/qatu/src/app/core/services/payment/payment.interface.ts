export interface OrderData {
    message: string;
    order: {
        buyer: string;
        products: Array<{
            product: string;
            quantity: number;
            seller: string;
            _id: string;
        }>;
        total: number;
        status: string;
        _id: string;
        createdAt: string;
        __v: number;
    };
}

export interface PaymentRequestData {
    orderId: string;
    cardNumber: string;
    cvv: string;
    cpf: string;
    cep: string;
}
