import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { api } from "services";
import { RootState } from "store/Store";
import { reduxSecureStorage, secureStorage, StorageKeys } from "utils";

import { Shipper } from "types";

export const authSliceKey = "auth";

type AuthState = {
  token: string;
  user: Shipper | null;
};

const initialState: AuthState = {
  token: "",
  user: null,
};

export const authSlice = createSlice({
  name: authSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      // Store token in secure storage
      secureStorage.setItem(StorageKeys.token, token);

      // Configure API
      api.setup({ token });
    },
    signOut: (state) => {
      state.token = "";
      state.user = null;
      // Clear secure storage
      secureStorage.removeItem(StorageKeys.token);
      // Clear API tokens
      api.ejectTokens();
    },
    setUser: (state, action: PayloadAction<Shipper>) => {
      state.user = action.payload;
    },
  },
});

export const { signIn, signOut, setUser } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);
export const selectUser = (state: RootState) => state.auth.user;

// Configure Redux-persist
export default persistReducer<AuthState>(
  {
    key: authSliceKey,
    storage: reduxSecureStorage,
    blacklist: ["isLoading", "error", "token"], // Don't persist loading state or errors
  },
  authSlice.reducer,
);
