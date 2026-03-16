import { useAppNavigation } from "@navigators/AppStack";
import Geolocation from "@react-native-community/geolocation";
import { useQueryClient } from "@tanstack/react-query";
import { useOrders, useUpdateOrderStatus } from "hooks";
import React, { useEffect, useState } from "react";
import { DimensionValue, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { style } from "theme";
import { OrderCard, OrderStatusToggle } from "./components";

const INITIAL_REGION: Region = {
  latitude: 10.762622,
  longitude: 106.660172,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const { data: orders = [] } = useOrders();
  const countdownWidth = useSharedValue(100);

  const activeOrder = orders.length > 0 ? orders[0] : null;

  useEffect(() => {
    countdownWidth.value = withTiming(0, { duration: 45000 });

    Geolocation.getCurrentPosition(
      (position) => {
        const newRegion = {
          ...INITIAL_REGION,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        };
        setRegion(newRegion);
      },
      (error) => console.log("Geolocation Error: ", error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const animatedCountdownStyle = useAnimatedStyle(() => ({
    width: `${countdownWidth.value}%` as DimensionValue,
  }));

  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();
  const queryClient = useQueryClient();

  const handleAccept = () => {
    if (!activeOrder) return;
    updateStatus(
      { id: activeOrder.id, status: "CONFIRMED" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          setIsAccepted(true);
        },
      }
    );
  };

  const handleReject = () => {
    // handle rejection logic
  };

  const handleViewDetails = () => {
    if (activeOrder) {
      navigation.navigate("OrderDetail", { order: activeOrder });
    }
  };

  return (
    <View style={style.flex_1}>
      {/* Map Background */}
      <MapView style={StyleSheet.absoluteFillObject} region={region}>
        {activeOrder && (
          <Marker
            coordinate={{
              latitude: parseFloat(activeOrder.lat),
              longitude: parseFloat(activeOrder.lng),
            }}
            title={activeOrder.restaurantName}
            pinColor="green"
          />
        )}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Vị trí của bạn"
        />
      </MapView>

      {/* Status Toggle — top right */}
      <View
        style={[
          style.abs,
          style.row,
          style.justify_end,
          styles.topControlsBar,
          { top: insets.top || 48 },
        ]}
      >
        <OrderStatusToggle />
      </View>

      {activeOrder && (
        <OrderCard
          order={activeOrder}
          isAccepted={isAccepted || activeOrder.status === "CONFIRMED"}
          loading={isUpdating}
          animatedCountdownStyle={animatedCountdownStyle}
          onAccept={handleAccept}
          onReject={handleReject}
          onViewDetails={handleViewDetails}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topControlsBar: {
    left: 16,
    right: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
    zIndex: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  headerRow: {
    marginBottom: 24,
  },
  typeBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#15803d",
    textTransform: "uppercase",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
  },
  incomeLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  incomeValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
  },
});
