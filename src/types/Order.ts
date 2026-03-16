export interface OrderItem {
  id: number;
  name: string;
  price: number;
}

export interface DeliveryOrder {
  id: string;
  address: string;
  createdAt: string;
  deliveryAddress: string;
  deliveryFee: number | null;
  items: OrderItem[];
  lat: string;
  lng: string;
  restaurantName: string;
  status: string;
  totalAmount: number;
  userName: string;
}
