import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  Verify,
  loginWithGoogleAccount,
} from "../../services/auth";
import { RegisterData, LoginData } from "../../models/user";

// return reducer & action
export const Register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, thunkApi) => {
    try {
      const { data } = await register(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const Login = createAsyncThunk(
  "auth/login",
  async (userData: LoginData, thunkApi) => {
    try {
      const { data } = await login(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const LoginWithGoogleAccount = createAsyncThunk(
  "auth/loginWithGoogle",
  async (userData: any, thunkApi) => {
    try {
      const { data } = await loginWithGoogleAccount(userData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ActiveAccount = createAsyncThunk(
  "auth/active",
  async (token: string) => {
    const { data } = await Verify(token);
    return data;
  }
);

type initialStateSlice = {
  current: Object;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const initialState: initialStateSlice = {
  current: {},
  error: null,
  loading: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(Login.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      Login.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.current = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(Login.rejected, (state: initialStateSlice, action: any) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(Register.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      Register.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.current = action;
        state.loading = false;
      }
    );
    builder.addCase(
      Register.rejected,
      (state: initialStateSlice, action: any) => {
        state.error = action.error;
        state.loading = false;
      }
    );
  },
});

export default authSlice.reducer;
