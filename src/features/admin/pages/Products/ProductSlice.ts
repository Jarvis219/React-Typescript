import { ProductModel } from "models/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductAPI,
  listProductAPI,
  updateProductAPI,
  removeProductAPI,
} from "services/products";

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

export const ListProduct = createAsyncThunk(
  "list-product",
  async (thunkApi) => {
    try {
      const { data }: any = await listProductAPI();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "update-product",
  async (product: any, thunkApi) => {
    try {
      const { data }: any = await updateProductAPI(product._id, product);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveProduct = createAsyncThunk(
  "remove-category",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeProductAPI(id);
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
        state.current.push(action.payload.data);
      }
    );

    builder.addCase(ListProduct.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListProduct.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListProduct.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(UpdateProduct.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      UpdateProduct.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      UpdateProduct.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
      }
    );

    builder.addCase(RemoveProduct.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      RemoveProduct.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      RemoveProduct.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
      }
    );
  },
});

export default productSlice.reducer;
