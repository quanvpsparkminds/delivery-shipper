import { DeliveryOrder, PaginatedResponse } from "types";
import { api } from "../Api";

export const OrderService = {
  getOrders: async () => {
    return api.get<DeliveryOrder[]>("delivery/order");
  },
  getHistory: async (page: number = 0, size: number = 10) => {
    return api.get<PaginatedResponse<DeliveryOrder>>("history", { params: { page, size } });
  },
  getOrderDetails: async (id: string) => {
    return api.get<DeliveryOrder>(`orders/${id}`);
  },
  updateOrderStatus: async (id: string, status: string) => {
    return api.post<DeliveryOrder>(`orders/status/${id}`, { status });
  },
};
