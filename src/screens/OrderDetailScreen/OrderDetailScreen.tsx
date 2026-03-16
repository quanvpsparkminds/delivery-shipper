import { AppText } from "components";
import { ChevronLeft, MessageSquare, Phone } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { spacing, style } from "theme";
import { DeliveryOrder, OrderItem } from "types";

type Props = StaticScreenProps<{
  order: DeliveryOrder;
}>;

export const OrderDetailScreen = ({ route }: Props) => {
  const { order } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[style.flex_1, { backgroundColor: "#f9fafb" }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft color="#1f2937" size={24} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Chi tiết đơn hàng</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Status Section */}
        <View style={styles.section}>
          <View style={style.row_between}>
            <View style={styles.statusBadge}>
              <AppText style={styles.statusBadgeText}>ĐANG GIAO HÀNG</AppText>
            </View>
            <AppText style={styles.orderIdText}>
              #ORD-{order.id.slice(0, 5).toUpperCase()}
            </AppText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: "70%" }]} />
            </View>
          </View>
          <AppText style={styles.statusDetailText}>
            Shipper đang di chuyển tới điểm giao (Dự kiến 8 phút nữa)
          </AppText>
        </View>

        {/* Route Section */}
        <View style={styles.section}>
          <View style={style.row}>
            <View style={styles.routeIcons}>
              <View style={styles.pickupIcon} />
              <View style={styles.routeLine} />
              <View style={styles.dropoffIcon} />
            </View>
            <View style={[style.flex_1, style.gap_lg]}>
              <View>
                <AppText style={styles.routeLabel}>ĐIỂM LẤY HÀNG</AppText>
                <AppText style={styles.locationName}>
                  {order.restaurantName}
                </AppText>
                <AppText style={styles.locationAddress}>
                  {order.address}
                </AppText>
              </View>
              <View>
                <AppText style={styles.routeLabel}>ĐIỂM GIAO HÀNG</AppText>
                <AppText style={styles.locationName}>
                  Địa điểm giao hàng
                </AppText>
                <AppText style={styles.locationAddress}>
                  {order.deliveryAddress}
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Thông tin khách hàng</AppText>
          <View style={[style.row, style.align_center, style.mt_sm]}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=" + order.userName }}
              style={styles.avatar}
            />
            <View style={[style.flex_1, style.ml_sm]}>
              <AppText style={styles.customerName}>
                {order.userName.split("@")[0]}
              </AppText>
              <AppText style={styles.customerPhone}>090 ••• ••67</AppText>
            </View>
            <View style={[style.row, style.gap_sm]}>
              <TouchableOpacity style={styles.iconButton}>
                <MessageSquare color="#ea580c" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: "#ea580c" }]}
              >
                <Phone color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Items Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Chi tiết mặt hàng</AppText>
          {order.items.map((item: OrderItem, index: number) => (
            <View key={index} style={[style.row, style.mt_md]}>
              <View style={styles.quantityBadge}>
                <AppText style={styles.quantityText}>{item.id}x</AppText>
              </View>
              <View style={[style.flex_1, style.ml_sm]}>
                <AppText style={styles.itemName}>{item.name}</AppText>
                <AppText style={styles.itemNote}>Thêm đá, ít đường</AppText>
              </View>
              <AppText style={styles.itemPrice}>
                {(item.price * 1000).toLocaleString()}đ
              </AppText>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={[style.row_between, style.mt_sm]}>
            <AppText style={styles.summaryLabel}>Tạm tính</AppText>
            <AppText style={styles.summaryValue}>
              {order.totalAmount.toLocaleString()}đ
            </AppText>
          </View>
          <View style={[style.row_between, style.mt_xs]}>
            <AppText style={styles.summaryLabel}>Phí giao hàng</AppText>
            <AppText style={styles.summaryValue}>
              {order.deliveryFee?.toLocaleString() || 0}đ
            </AppText>
          </View>
        </View>

        {/* Payment Section */}
        <View style={[styles.section, styles.paymentSection]}>
          <View style={style.row_between}>
            <AppText style={styles.totalLabel}>Tổng thanh toán</AppText>
            <AppText style={styles.totalValue}>
              {(order.totalAmount + (order.deliveryFee || 0)).toLocaleString()}đ
            </AppText>
          </View>
          <View style={[style.row, style.align_center, style.mt_sm]}>
            <AppText style={styles.paymentMethodLabel}>Thanh toán bằng</AppText>
            <AppText style={styles.paymentMethodValue}> Tiền mặt (COD)</AppText>
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
          <View style={[style.row, style.align_center, style.gap_sm]}>
            <View style={styles.checkIcon}>
              <AppText style={{ color: "#059669", fontWeight: "bold" }}>
                ✓
              </AppText>
            </View>
            <AppText style={styles.confirmButtonText}>Xác nhận đã giao</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "white",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statusBadge: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ea580c",
  },
  orderIdText: {
    fontSize: 11,
    color: "#9ca3af",
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ea580c",
  },
  statusDetailText: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 12,
  },
  routeIcons: {
    width: 24,
    alignItems: "center",
    marginRight: 12,
  },
  pickupIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#ea580c",
    backgroundColor: "white",
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 4,
  },
  dropoffIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ea580c",
  },
  routeLabel: {
    fontSize: 10,
    color: "#9ca3af",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 2,
  },
  locationAddress: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },
  customerPhone: {
    fontSize: 13,
    color: "#6b7280",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff7ed",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBadge: {
    backgroundColor: "#fff7ed",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    height: 24,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ea580c",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  itemNote: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 16,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  paymentSection: {
    backgroundColor: "#fff7ed",
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    color: "#4b5563",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ea580c",
  },
  paymentMethodLabel: {
    fontSize: 13,
    color: "#69431e",
  },
  paymentMethodValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4b5563",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  confirmButton: {
    backgroundColor: "#059669",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
