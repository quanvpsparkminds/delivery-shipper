import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AppText } from "components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeft, Search } from "lucide-react-native";
import { HistoryFilter, HistoryOrderCard } from "./components";

const MOCK_ORDERS = [
  {
    orderId: "#ORD-88291",
    time: "14:20",
    type: "Giao hàng nhanh",
    amount: "+25.000đ",
    status: "Hoàn thành" as const,
    pickup: "Cửa hàng Phúc Long, Quận 1",
    dropoff: "123 Lê Lợi, Phường Bến Thành, Q.1",
  },
  {
    orderId: "#ORD-88285",
    time: "11:05",
    type: "Siêu thị",
    amount: "0đ",
    status: "Đã hủy" as const,
    pickup: "WinMart+, Thảo Điền",
    dropoff: "Chung cư Masteri T5, Quận 2",
  },
];

const MOCK_ORDERS_YESTERDAY = [
  {
    orderId: "#ORD-88152",
    time: "18:45",
    type: "Giao đồ ăn",
    amount: "+18.000đ",
    status: "Hoàn thành" as const,
    pickup: "Tiệm cơm tấm Cali, Q.10",
    dropoff: "Hẻm 456 Sư Vạn Hạnh, Quận 10",
  },
];

export const HistoryScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header Area */}
      <View style={styles.headerWrapper}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color="#64748b" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm mã đơn hàng..."
              placeholderTextColor="#64748b"
            />
          </View>
        </View>

        {/* Filters */}
        <HistoryFilter />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today Group */}
        <View style={styles.dateGroupHeader}>
          <AppText style={styles.dateGroupText}>
            HÔM NAY, 24 THÁNG 5 2024
          </AppText>
        </View>

        <View style={styles.cardsContainer}>
          {MOCK_ORDERS.map((order, index) => (
            <HistoryOrderCard key={index} {...order} />
          ))}
        </View>

        {/* Yesterday Group */}
        <View style={[styles.dateGroupHeader, styles.dateGroupBorder]}>
          <AppText style={styles.dateGroupText}>
            HÔM QUA, 23 THÁNG 5 2024
          </AppText>
        </View>

        <View style={styles.cardsContainer}>
          {MOCK_ORDERS_YESTERDAY.map((order, index) => (
            <HistoryOrderCard key={index} {...order} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f6",
  },
  headerWrapper: {
    backgroundColor: "#f8f6f6",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(236, 91, 19, 0.1)",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    flex: 1,
    textAlign: "center",
  },
  spacer: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(226, 232, 240, 0.5)",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  dateGroupHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f1f5f9",
  },
  dateGroupBorder: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  dateGroupText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#64748b",
  },
  cardsContainer: {
    gap: 1,
    backgroundColor: "#f1f5f9", // the separator color
  },
});
