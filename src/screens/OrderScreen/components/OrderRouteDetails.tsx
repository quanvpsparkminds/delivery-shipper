import { AppText } from "components";
import { Clock, Navigation2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { style } from "theme";

type Props = {
  pickup: string;
  dropoff: string;
  distance: string;
  estimatedTime: string;
};

export const OrderRouteDetails = ({
  pickup,
  dropoff,
  distance,
  estimatedTime,
}: Props) => {
  return (
    <>
      {/* Route */}
      <View style={styles.routeContainer}>
        {/* Pickup */}
        <View style={[style.row, styles.routeRow]}>
          <View style={[style.align_center, styles.dotsCol]}>
            <View style={[styles.routeDot, { backgroundColor: "#22c55e" }]} />
            <View style={styles.routeLine} />
          </View>
          <View style={style.flex_1}>
            <AppText style={styles.routeLabel}>LẤY HÀNG</AppText>
            <AppText style={styles.routeAddress} numberOfLines={1}>
              {pickup}
            </AppText>
          </View>
        </View>

        {/* Dropoff */}
        <View style={[style.row, styles.routeRow]}>
          <View style={[style.align_center, styles.dotsCol]}>
            <View style={[styles.routeDot, { backgroundColor: "#f97316" }]} />
          </View>
          <View style={style.flex_1}>
            <AppText style={styles.routeLabel}>GIAO HÀNG</AppText>
            <AppText style={styles.routeAddress} numberOfLines={1}>
              {dropoff}
            </AppText>
          </View>
        </View>
      </View>

      {/* Metrics */}
      <View style={[style.row_between, styles.metricsRow]}>
        <View style={[style.row, style.align_center, style.gap_xs]}>
          <View style={[styles.metricIconBox, { backgroundColor: "#eff6ff" }]}>
            <Navigation2 color="#2563eb" size={20} />
          </View>
          <View>
            <AppText style={styles.metricLabel}>QUÃNG ĐƯỜNG</AppText>
            <AppText style={styles.metricValue}>{distance}</AppText>
          </View>
        </View>

        <View style={[style.row, style.align_center, style.gap_xs]}>
          <View style={[styles.metricIconBox, { backgroundColor: "#faf5ff" }]}>
            <Clock color="#9333ea" size={20} />
          </View>
          <View>
            <AppText style={styles.metricLabel}>THỜI GIAN DỰ KIẾN</AppText>
            <AppText style={styles.metricValue}>{estimatedTime}</AppText>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    marginBottom: 16,
  },
  routeRow: {
    alignItems: "stretch",
    marginBottom: 8,
  },
  dotsCol: {
    width: 24,
    marginRight: 12,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 4,
  },
  routeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 2,
  },
  routeAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    paddingBottom: 12,
  },
  metricsRow: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f9fafb",
    marginBottom: 24,
  },
  metricIconBox: {
    padding: 8,
    borderRadius: 8,
  },
  metricLabel: {
    fontSize: 10,
    color: "#9ca3af",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
  },
});
