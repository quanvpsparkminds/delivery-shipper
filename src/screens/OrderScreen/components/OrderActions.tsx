import { AppText } from "components";
import { ArrowUpRight, Check } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { style } from "theme";

type Props = {
  isAccepted: boolean;
  loading: boolean;
  animatedCountdownStyle: object;
  onAccept: () => void;
  onReject: () => void;
};

export const OrderActions = ({
  isAccepted,
  loading,
  animatedCountdownStyle,
  onAccept,
  onReject,
}: Props) => {
  return (
    <>
      {/* Buttons */}
      <View style={[style.row, style.gap_sm]}>
        <TouchableOpacity
          style={styles.rejectButton}
          disabled={loading || isAccepted}
          onPress={onReject}
        >
          <AppText style={styles.rejectText}>Từ chối</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acceptButton, isAccepted && styles.acceptedButton]}
          disabled={loading || isAccepted}
          onPress={onAccept}
        >
          <View style={[style.row, style.align_center, style.gap_xs]}>
            {loading ? (
              <AppText style={styles.acceptText}>Đang xử lý...</AppText>
            ) : isAccepted ? (
              <>
                <AppText style={styles.acceptText}>Đã nhận đơn!</AppText>
                <Check color="white" size={20} />
              </>
            ) : (
              <>
                <AppText style={styles.acceptText}>Nhận đơn</AppText>
                <ArrowUpRight color="white" size={20} />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Countdown */}
      {!isAccepted && (
        <View style={style.mt_sm}>
          <View style={styles.countdownTrack}>
            <Animated.View
              style={[styles.countdownFill, animatedCountdownStyle]}
            />
          </View>
          <AppText style={styles.countdownText}>
            Đơn hàng sẽ hết hạn sau 45 giây
          </AppText>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rejectButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectText: {
    color: "#4b5563",
    fontWeight: "bold",
    fontSize: 16,
  },
  acceptButton: {
    flex: 2,
    paddingVertical: 16,
    backgroundColor: "#22c55e",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#22c55e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  acceptedButton: {
    backgroundColor: "#047857",
  },
  acceptText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  countdownTrack: {
    height: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 8,
  },
  countdownFill: {
    height: "100%",
    backgroundColor: "#fb923c",
    borderRadius: 2,
  },
  countdownText: {
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
  },
});
