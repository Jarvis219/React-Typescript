import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategoryAPI,
  listCategoryAPI,
  updateCategoryAPI,
  removeCategoryAPI,
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
  "update-category",
  async (category: any, thunkApi) => {
    try {
      const { data }: any = await updateCategoryAPI(category.id, category.name);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "remove-category",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeCategoryAPI(id);
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
        state.current.push(action.payload.data);
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

    builder.addCase(updateCategory.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      updateCategory.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      updateCategory.fulfilled,
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

    builder.addCase(removeCategory.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      removeCategory.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      removeCategory.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;

        let index = state.current.findIndex(
          (tutorial: any) => tutorial._id === action.payload.data._id
        );
        state.current.splice(index, 1);
      }
    );
  },
});

export default categorySlice.reducer;
