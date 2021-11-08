import { CartModel } from "models/cart";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCartAPI,
  listCartAPI,
  updateCartAPI,
  removeCartAPI,
  listCartUserAPI,
} from "services/cart";
import { Pagination } from "utils/utils";
import { setCountProduct } from "utils/utils";

export const CreateCart = createAsyncThunk(
  "create-cart",
  async (cart: CartModel, thunkApi) => {
    try {
      const { data }: any = await createCartAPI(cart);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListCart = createAsyncThunk(
  "list-cart",
  async (pagination: Pagination, thunkApi) => {
    try {
      const { data }: any = await listCartAPI(
        pagination.limit,
        pagination.skip
      );
      setCountProduct(data.count);
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const ListCartUser = createAsyncThunk(
  "list-cart-user",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await listCartUserAPI(id);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateCart = createAsyncThunk(
  "update-cart",
  async (cart: any, thunkApi) => {
    try {
      const { data }: any = await updateCartAPI(cart._id, cart);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveCart = createAsyncThunk(
  "remove-cart",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeCartAPI(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

type initialStateSlice = {
  current: CartModel[];
  error: string | null;
  loading: boolean;
};

const initialState: initialStateSlice = {
  current: [],
  error: null,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCart.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      CreateCart.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      CreateCart.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current.push(action.payload.data);
      }
    );

    builder.addCase(ListCartUser.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListCartUser.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListCartUser.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(ListCart.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListCart.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListCart.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(UpdateCart.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      UpdateCart.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      UpdateCart.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
      }
    );

    builder.addCase(RemoveCart.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      RemoveCart.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      RemoveCart.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
      }
    );
  },
});

export default cartSlice.reducer;
