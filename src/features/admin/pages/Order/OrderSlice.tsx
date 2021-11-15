import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderModel } from "models/order";
import {
  createOrderAPI,
  listOrderAPI,
  removeOrderAPI,
  updateOrderAPI,
  readOrderAPI,
} from "services/order";
import { setCountOrder } from "utils/utils";

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

export const ListOrder = createAsyncThunk("list-order", async (thunkApi) => {
  try {
    const { data }: any = await listOrderAPI();
    setCountOrder(data.count);
    return data.data;
  } catch (error) {
    return error;
  }
});

export const ReadOrder = createAsyncThunk(
  "read-order",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await readOrderAPI(id);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateOrder = createAsyncThunk(
  "update-order",
  async (order: any, thunkApi) => {
    try {
      const { data }: any = await updateOrderAPI(order._id, order);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveOrder = createAsyncThunk(
  "remove-order",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeOrderAPI(id);
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

    builder.addCase(ListOrder.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListOrder.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListOrder.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(UpdateOrder.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      UpdateOrder.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      UpdateOrder.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        const index = state.current.findIndex((tutorial: any) => {
          return tutorial._id === action.payload.data._id;
        });
        state.current[index] = {
          ...state.current[index],
          ...action.payload.data,
        };
      }
    );

    builder.addCase(RemoveOrder.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      RemoveOrder.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      RemoveOrder.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        let index = state.current.findIndex((tutorial: any) => {
          return tutorial._id === action.payload.data._id;
        });
        state.current.splice(index, 1);
      }
    );
  },
});

export default orderSlice.reducer;
