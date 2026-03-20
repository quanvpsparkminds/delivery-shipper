import { AppText } from "components";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HistoryOrderCard } from "./components";

import { format, isToday, isYesterday } from "date-fns";
import { vi } from "date-fns/locale";
import { useHistory } from "hooks/Query/Order";
import { groupBy } from "lodash";
import { ActivityIndicator, RefreshControl } from "react-native";
import { DeliveryOrder } from "types";
import { amountUtils } from "utils";

export const HistoryScreen = () => {
  const insets = useSafeAreaInsets();
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHistory();
  const orders = data?.pages.flatMap((page) => page.content) || [];

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const groupedOrders = groupBy(orders, (order: DeliveryOrder) =>
    format(new Date(order.createdAt), "yyyy-MM-dd"),
  );

  const formatDateGroup = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date))
      return (
        "HÔM NAY, " + format(date, "d MMMM yyyy", { locale: vi }).toUpperCase()
      );
    if (isYesterday(date))
      return (
        "HÔM QUA, " + format(date, "d MMMM yyyy", { locale: vi }).toUpperCase()
      );
    return format(date, "EEEE, d MMMM yyyy", { locale: vi }).toUpperCase();
  };

  const mapOrderToCardProps = (order: DeliveryOrder) => ({
    orderId: `#ORD-${order.id.length > 10 ? order.id.split("-")[0] : order.id}`,
    time: format(new Date(order.createdAt), "HH:mm"),
    type: "Giao đồ ăn", // Can be dynamic if API provides order type
    amount:
      (order.status === "COMPLETED" ? "+" : "") +
      amountUtils.formatMoney(order.totalAmount),
    status: (order.status === "COMPLETED" ? "Hoàn thành" : "Đã hủy") as
      | "Hoàn thành"
      | "Đã hủy",
    pickup: order.restaurantName,
    dropoff: order.deliveryAddress,
  });

  return (
    <View style={styles.container}>
      {/* Header Area */}

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        {isLoading && !isRefetching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#ec5b13" />
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <AppText style={styles.emptyText}>Chưa có lịch sử đơn hàng</AppText>
          </View>
        ) : (
          Object.keys(groupedOrders)
            .sort((a, b) => b.localeCompare(a)) // Sort dates descending
            .map((dateStr) => (
              <View key={dateStr}>
                <View
                  style={[
                    styles.dateGroupHeader,
                    dateStr !== Object.keys(groupedOrders)[0] &&
                      styles.dateGroupBorder,
                  ]}
                >
                  <AppText style={styles.dateGroupText}>
                    {formatDateGroup(dateStr)}
                  </AppText>
                </View>

                <View style={styles.cardsContainer}>
                  {groupedOrders[dateStr].map((order, index) => (
                    <HistoryOrderCard
                      key={order.id}
                      {...mapOrderToCardProps(order)}
                    />
                  ))}
                </View>
              </View>
            ))
        )}
        {isFetchingNextPage && (
          <View style={{ paddingVertical: 20, alignItems: "center" }}>
            <ActivityIndicator color="#ec5b13" />
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
  },
});
