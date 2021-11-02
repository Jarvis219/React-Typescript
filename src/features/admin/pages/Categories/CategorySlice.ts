import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategoryAPI,
  listCategoryAPI,
  updateCategoryAPI,
} from "services/category";
export const CreateCategory = createAsyncThunk(
  "create-category",
  async (category: any, thunkApi) => {
    try {
      const { data }: any = await createCategoryAPI(category);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const listCategory = createAsyncThunk(
  "list-category",
  async (thunkApi) => {
    try {
      const { data }: any = await listCategoryAPI();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "list-category",
  async (category: any, thunkApi) => {
    try {
      const { data }: any = await updateCategoryAPI(category.id, category.name);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

type initialStateSlice = {
  current: Object;
  error: string | null;
  loading: boolean;
};

const initialState: initialStateSlice = {
  current: {},
  error: null,
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(CreateCategory.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      CreateCategory.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      CreateCategory.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(listCategory.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      listCategory.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      listCategory.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    // builder.addCase(updateCategory.pending, (state: initialStateSlice) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   updateCategory.rejected,
    //   (state: initialStateSlice, action: any) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   }
    // );
    // builder.addCase(
    //   updateCategory.fulfilled,
    //   (state: initialStateSlice, action: any) => {
    //     state.loading = false;
    //     state.current = action.payload;
    //   }
    // );
  },
});

export default categorySlice.reducer;
