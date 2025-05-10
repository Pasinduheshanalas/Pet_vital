// store/slices/dataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
  productSlice.actions;
export default productSlice.reducer;
