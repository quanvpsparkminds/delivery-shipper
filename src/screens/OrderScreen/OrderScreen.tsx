import { images } from "@assets/index";
import { AppText } from "components";
import React, { useEffect, useState } from "react";
import {
  DimensionValue,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, style } from "theme";
import {
  OrderActions,
  OrderRouteDetails,
  OrderStatusToggle,
} from "./components";

export const OrderScreen = () => {
  const insets = useSafeAreaInsets();
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const countdownWidth = useSharedValue(100);

  useEffect(() => {
    countdownWidth.value = withTiming(0, { duration: 45000 });
  }, []);

  const animatedCountdownStyle = useAnimatedStyle(() => ({
    width: `${countdownWidth.value}%` as DimensionValue,
  }));

  const handleAccept = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAccepted(true);
    }, 1500);
  };

  const handleReject = () => {
    // handle rejection logic
  };

  return (
    <View style={style.flex_1}>
      {/* Map Background fills the whole screen */}
      <ImageBackground
        source={images.map_bg}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
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
      </ImageBackground>

      {/* Floating Order Card — pinned to bottom */}
      <View style={[style.justify_end, style.flex_1]}>
        <View style={[styles.cardContainer, { paddingBottom: spacing.sm }]}>
          <View style={styles.card}>
            {/* Header: order type + income */}
            <View
              style={[style.row_between, style.align_end, styles.headerRow]}
            >
              <View>
                <View style={styles.typeBadge}>
                  <AppText style={styles.typeBadgeText}>
                    Giao Đồ Ăn (Food)
                  </AppText>
                </View>
                <AppText style={styles.titleText}>Đơn hàng mới!</AppText>
              </View>
              <View style={style.align_end}>
                <AppText style={styles.incomeLabel}>Thu nhập</AppText>
                <AppText style={styles.incomeValue}>30.000đ</AppText>
              </View>
            </View>

            {/* Route + Metrics */}
            <OrderRouteDetails
              pickup="Cửa hàng Bánh Mì PewPew - Quận 1"
              dropoff="123 Đường Lê Lợi, Phường Bến Thành"
              distance="5.0 km"
              estimatedTime="15 phút"
            />

            {/* Actions + Countdown */}
            <OrderActions
              isAccepted={isAccepted}
              loading={loading}
              animatedCountdownStyle={animatedCountdownStyle}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          </View>
        </View>
      </View>
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
