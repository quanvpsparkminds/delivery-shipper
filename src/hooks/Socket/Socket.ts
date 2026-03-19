import Geolocation from "@react-native-community/geolocation";
import { useQueryClient } from "@tanstack/react-query";
import { useOrders } from "hooks/Query";
import { useAppSelector } from "hooks/RTK";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { selectUser } from "store";
import { selectIsActive } from "store/slices/GeneralSlice";

export const useSocket = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const shipper = useAppSelector(selectUser);
  const isActive = useAppSelector(selectIsActive);
  const queryClient = useQueryClient();

  const { data: orders = [] } = useOrders();
  const activeOrder = orders.length > 0 ? orders[0] : null;

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      setStompClient(client);
    });
  };

  //initial socket
  useEffect(() => {
    connect();
  }, []);

  console.log(isActive);

  //subscribe to topic
  useEffect(() => {
    if (!stompClient || !shipper?.id) {
      return;
    }

    if (activeOrder || !isActive) {
      stompClient.send(
        "/app/shipper/location/remove",
        {},
        shipper?.id.toString(),
      );
    } else {
      Geolocation.getCurrentPosition(
        (position) => {
          stompClient.send(
            "/app/shipper/location",
            {},
            JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              id: shipper?.id,
            }),
          );
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, [stompClient, shipper?.id, isActive, activeOrder]);

  useEffect(() => {
    if (!stompClient || !shipper?.id || !isActive) {
      return;
    }
    stompClient?.subscribe(`/topic/delivery/${shipper?.id}`, (message: any) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    });
  }, [stompClient, shipper?.id, isActive]);
};
