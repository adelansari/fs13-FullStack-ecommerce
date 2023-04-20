export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    company: string;
    category: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}
