import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthApi } from "services/Auth/AuthApi";
import { useAppDispatch } from "hooks";
import { setUser, signOut } from "store/slices/AuthSlice";
import { palette } from "theme";

export const FetchingDataScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthApi.getMe();
        if (response.status === 200 && response.data) {
          dispatch(setUser(response.data));
        } else {
          dispatch(signOut());
        }
      } catch (error) {
        console.error("Error fetching shipper data:", error);
        dispatch(signOut());
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={palette.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.white,
  },
});
