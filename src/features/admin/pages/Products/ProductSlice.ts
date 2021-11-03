import { ProductModel } from "models/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductAPI } from "services/products";

export const CreateProduct = createAsyncThunk(
  "create-product",
  async (product: ProductModel, thunkApi) => {
    try {
      const { data }: any = await createProductAPI(product);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

type initialStateSlice = {
  current: any | ProductModel;
  error: string | null;
  loading: boolean;
};

const initialState: initialStateSlice = {
  current: [],
  error: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateProduct.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      CreateProduct.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      CreateProduct.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );
  },
});

export default productSlice.reducer;
