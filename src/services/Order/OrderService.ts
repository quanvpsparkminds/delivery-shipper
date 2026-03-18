import { DeliveryOrder } from "types";
import { api } from "../Api";

export const OrderService = {
  getOrders: async () => {
    return api.get<DeliveryOrder[]>("delivery/order");
  },
  getHistory: async () => {
    return api.get<DeliveryOrder[]>("history");
  },
  getOrderDetails: async (id: string) => {
    return api.get<DeliveryOrder>(`orders/${id}`);
  },
  updateOrderStatus: async (id: string, status: string) => {
    return api.post<DeliveryOrder>(`orders/status/${id}`, { status });
  },
};
