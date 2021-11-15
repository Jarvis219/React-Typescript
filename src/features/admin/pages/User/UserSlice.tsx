import {
  listUserAPI,
  readUserAPI,
  updateUserAPI,
  removeUserAPI,
} from "services/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const ListUsers = createAsyncThunk("list-users", async (thunkApi) => {
  try {
    const { data }: any = await listUserAPI();
    return data;
  } catch (error) {
    return error;
  }
});

export const ReadUser = createAsyncThunk("read-user", async (thunkApi) => {
  try {
    const { data }: any = await readUserAPI();
    return data;
  } catch (error) {
    return error;
  }
});

export const RemoveUser = createAsyncThunk(
  "remove-user",
  async (_id: string, thunkApi) => {
    try {
      const { data }: any = await removeUserAPI(_id);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "update-user",
  async (user: { _id: string; permission: number }, thunkApi) => {
    try {
      const { data }: any = await updateUserAPI(user._id, user.permission);
      return data;
    } catch (error) {
      return error;
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(ListUsers.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      ListUsers.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      ListUsers.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(UpdateUser.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      UpdateUser.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      UpdateUser.fulfilled,
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

    builder.addCase(RemoveUser.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      RemoveUser.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      RemoveUser.fulfilled,
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

export default userSlice.reducer;
