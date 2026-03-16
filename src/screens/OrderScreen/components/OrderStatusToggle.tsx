import { AppText } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useCallback } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { selectIsActive, toggleActive } from "store/slices/GeneralSlice";
import { style } from "theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const OrderStatusToggle = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(selectIsActive);

  const onToggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(toggleActive());
  }, [dispatch]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[style.row, styles.toggleWrapper]}
    >
      <View
        style={[
          styles.toggleBar,
          { backgroundColor: isActive ? "#22c55e" : "#d1d5db" },
        ]}
      >
        <View
          style={[
            styles.toggleKnob,
            { marginLeft: isActive ? 18 : 2 },
          ]}
        />
      </View>
      <AppText style={styles.toggleText}>
        {isActive ? "ĐANG HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleWrapper: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  toggleBar: {
    width: 32,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    marginRight: 8,
  },
  toggleKnob: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    letterSpacing: -0.2,
  },
});
