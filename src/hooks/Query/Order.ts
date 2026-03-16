import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderService } from "services";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await OrderService.getOrders();
      return response.data || [];
    },
    refetchInterval: 30000, // Optional: refetch every 30 seconds
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      OrderService.updateOrderStatus(id, status),
  });
};
