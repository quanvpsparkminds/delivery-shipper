import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const useSocket = () => {
  const [stompClient, setStompClient] = useState<any>(null);

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

  //subscribe to topic
  useEffect(() => {
    if (!stompClient) {
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        stompClient.send(
          "/app/shipper/location",
          {},
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            id: 1,
          }),
        );
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, [stompClient]);

  useEffect(() => {
    if (!stompClient) {
      return;
    }
    stompClient?.subscribe("/topic/delivery/1", (message: any) => {
      console.log(message);
    });
  }, [stompClient]);
};
