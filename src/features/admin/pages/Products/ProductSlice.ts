import { ProductModel } from "models/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductAPI,
  listProductAPI,
  updateProductAPI,
  removeProductAPI,
  filterCategory,
  listSearchAPI,
} from "services/products";
import { setCountProduct } from "utils/utils";

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
      setCountProduct(data.count);
      return data.data;
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
  "remove-product",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeProductAPI(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const FilterCategory = createAsyncThunk(
  "filter-category",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await filterCategory(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListSearch = createAsyncThunk(
  "list-search",
  async (name: string, thunkApi) => {
    try {
      const { data }: any = await listSearchAPI(name);
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

    builder.addCase(ListSearch.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListSearch.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListSearch.fulfilled,
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
        const index = state.current.findIndex((tutorial: any) => {
          return tutorial._id === action.payload.data._id;
        });
        state.current[index] = {
          ...state.current[index],
          ...action.payload.data,
        };
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
        let index = state.current.findIndex((tutorial: any) => {
          return tutorial._id === action.payload.data._id;
        });
        state.current.splice(index, 1);
      }
    );
  },
});

export default productSlice.reducer;
