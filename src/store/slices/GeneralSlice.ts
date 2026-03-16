import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/Store";

export const generalSliceKey = "general";

type GeneralState = {
  isActive: boolean;
};

const initialState: GeneralState = {
  isActive: true, // Default to true as shown in the original UI
};

export const generalSlice = createSlice({
  name: generalSliceKey,
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.isActive = !state.isActive;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { toggleActive, setIsActive } = generalSlice.actions;

export const selectIsActive = (state: RootState) => state.general.isActive;

export default generalSlice.reducer;
