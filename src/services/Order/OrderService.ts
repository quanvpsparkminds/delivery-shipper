import { DeliveryOrder } from "types";
import { api } from "../Api";

export const OrderService = {
  getOrders: async () => {
    return api.get<DeliveryOrder[]>("delivery/order");
  },
  updateOrderStatus: async (id: string, status: string) => {
    return api.post(`orders/status/${id}`, { status });
  },
};
