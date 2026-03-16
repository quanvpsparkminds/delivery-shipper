import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "components";
import { MapPin, Flag } from "lucide-react-native";

export type HistoryOrderCardProps = {
  orderId: string;
  time: string;
  type: string;
  amount: string;
  status: "Hoàn thành" | "Đã hủy";
  pickup: string;
  dropoff: string;
};

export const HistoryOrderCard = ({
  orderId,
  time,
  type,
  amount,
  status,
  pickup,
  dropoff,
}: HistoryOrderCardProps) => {
  const isCompleted = status === "Hoàn thành";

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText style={styles.orderId}>{orderId}</AppText>
          <AppText style={styles.timeAndType}>
            {time} • {type}
          </AppText>
        </View>
        <View style={styles.rightHeader}>
          <AppText
            style={[styles.amount, !isCompleted && styles.amountCancelled]}
          >
            {amount}
          </AppText>
          <View
            style={[
              styles.statusBadge,
              isCompleted ? styles.statusCompleted : styles.statusCancelled,
            ]}
          >
            <AppText
              style={[
                styles.statusText,
                isCompleted
                  ? styles.statusTextCompleted
                  : styles.statusTextCancelled,
              ]}
            >
              {status}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.routeContainer}>
        {/* Pickup */}
        <View style={styles.routeRow}>
          <View style={styles.iconColumn}>
            <MapPin color="#3b82f6" size={18} />
            <View style={styles.line} />
          </View>
          <View style={styles.textColumn}>
            <AppText style={styles.routeLabel}>Điểm nhận</AppText>
            <AppText style={styles.routeAddress} numberOfLines={1}>
              {pickup}
            </AppText>
          </View>
        </View>

        {/* Dropoff */}
        <View style={styles.routeRow}>
          <View style={styles.iconColumn}>
            <Flag color="#ec5b13" size={18} />
          </View>
          <View style={styles.textColumn}>
            <AppText style={styles.routeLabel}>Điểm giao</AppText>
            <AppText style={styles.routeAddress} numberOfLines={1}>
              {dropoff}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ec5b13",
  },
  timeAndType: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  rightHeader: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },
  amountCancelled: {
    color: "#94a3b8",
    textDecorationLine: "line-through",
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 4,
  },
  statusCompleted: {
    backgroundColor: "#dcfce7",
  },
  statusCancelled: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  statusTextCompleted: {
    color: "#15803d",
  },
  statusTextCancelled: {
    color: "#b91c1c",
  },
  routeContainer: {
    gap: 12,
  },
  routeRow: {
    flexDirection: "row",
    gap: 12,
  },
  iconColumn: {
    alignItems: "center",
    width: 20,
  },
  line: {
    width: 2,
    height: 24,
    backgroundColor: "#e2e8f0",
    marginVertical: 4,
  },
  textColumn: {
    flex: 1,
    paddingBottom: 4,
  },
  routeLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  routeAddress: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1e293b",
    marginTop: 2,
  },
});
