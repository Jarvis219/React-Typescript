import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderModel } from "models/order";
import { createOrderAPI } from "services/order";

export const CreateOrder = createAsyncThunk(
  "create-order",
  async (order: OrderModel, thunkApi) => {
    try {
      const { data }: any = await createOrderAPI(order);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

type initialStateSlice = {
  current: any;
  error: string | null;
  loading: boolean;
};

const initialState: initialStateSlice = {
  current: [],
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(CreateOrder.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      CreateOrder.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      CreateOrder.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current.push(action.payload.data);
      }
    );
  },
});

export default orderSlice.reducer;
