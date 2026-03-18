import { AppText } from "components";
import { Phone } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { spacing, style } from "theme";
import { DeliveryOrder } from "types";
import { OrderActions } from "./OrderActions";
import { OrderRouteDetails } from "./OrderRouteDetails";

interface OrderCardProps {
  order: DeliveryOrder;
  isAccepted: boolean;
  loading: boolean;
  animatedCountdownStyle: any;
  onAccept: () => void;
  onReject: () => void;
  onViewDetails: () => void;
}

export const OrderCard = ({
  order,
  isAccepted,
  loading,
  animatedCountdownStyle,
  onAccept,
  onReject,
  onViewDetails,
}: OrderCardProps) => {
  const isConfirmed = order.status !== "PENDING";

  if (isConfirmed) {
    return (
      <View style={[style.justify_end, style.flex_1]}>
        <View style={[styles.cardContainer, { paddingBottom: spacing.sm }]}>
          <View style={styles.card}>
            <View style={style.row_between}>
              <View style={styles.confirmedBadge}>
                <AppText style={styles.confirmedBadgeText}>ĐANG GIAO</AppText>
              </View>
              <View style={style.align_end}>
                <AppText style={styles.estimatedLabel}>THỜI GIAN DỰ KIẾN</AppText>
                <AppText style={styles.estimatedValue}>12 Phút</AppText>
              </View>
            </View>

            <AppText style={styles.orderId}>#ORD-{order.id.slice(0, 5).toUpperCase()}</AppText>

            <View style={[style.row, style.gap_sm, style.mt_sm]}>
              <View style={styles.statusDot} />
              <View>
                <AppText style={styles.statusLabel}>TRẠNG THÁI</AppText>
                <AppText style={styles.statusValue}>Đang đến điểm lấy hàng</AppText>
              </View>
            </View>

            <View style={[style.row, style.gap_sm, style.mt_lg, style.mb_lg]}>
              <View style={styles.pickupCircle} />
              <View>
                <AppText style={styles.pickupLabel}>ĐIỂM LẤY HÀNG</AppText>
                <AppText style={styles.restaurantName}>{order.restaurantName}</AppText>
                <AppText style={styles.addressText}>{order.address}</AppText>
              </View>
            </View>

            <View style={[style.row, style.gap_md]}>
              <TouchableOpacity
                style={styles.detailsButton}
                activeOpacity={0.8}
                onPress={onViewDetails}
              >
                <AppText style={styles.detailsButtonText}>Xem chi tiết</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.phoneButton} activeOpacity={0.8}>
                <Phone color="#1f2937" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[style.justify_end, style.flex_1]}>
      <View style={[styles.cardContainer, { paddingBottom: spacing.sm }]}>
        <View style={styles.card}>
          {/* Header: order type + income */}
          <View style={[style.row_between, style.align_end, styles.headerRow]}>
            <View>
              <View style={styles.typeBadge}>
                <AppText style={styles.typeBadgeText}>Giao Đồ Ăn (Food)</AppText>
              </View>
              <AppText style={styles.titleText}>Đơn hàng mới!</AppText>
            </View>
            <View style={style.align_end}>
              <AppText style={styles.incomeLabel}>Thu nhập</AppText>
              <AppText style={styles.incomeValue}>
                {order.totalAmount.toLocaleString()}đ
              </AppText>
            </View>
          </View>

          {/* Route + Metrics */}
          <OrderRouteDetails
            pickup={order.restaurantName}
            dropoff={order.deliveryAddress}
            distance="5.0 km"
            estimatedTime="15 phút"
          />

          {/* Actions + Countdown */}
          <OrderActions
            isAccepted={isAccepted}
            loading={loading}
            animatedCountdownStyle={animatedCountdownStyle}
            onAccept={onAccept}
            onReject={onReject}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  confirmedBadge: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confirmedBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ea580c",
  },
  estimatedLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "600",
  },
  estimatedValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ea580c",
  },
  orderId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ea580c",
    marginTop: 4,
    borderWidth: 2,
    borderColor: "#ffedd5",
  },
  statusLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  statusValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f2937",
  },
  pickupCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ea580c",
    marginTop: 4,
  },
  pickupLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  addressText: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: "#ea580c",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ea580c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  detailsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneButton: {
    width: 56,
    height: 56,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

