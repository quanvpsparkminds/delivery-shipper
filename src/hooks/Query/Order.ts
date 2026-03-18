import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await OrderService.getHistory();
      return response.data || [];
    },
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await OrderService.getOrderDetails(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      OrderService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};
