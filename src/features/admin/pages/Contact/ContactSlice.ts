import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createContactAPI,
  listContactAPI,
  updateContactAPI,
  removeContactAPI,
} from "services/contact";
export const CreateContact = createAsyncThunk(
  "create-contact",
  async (contact: any, thunkApi) => {
    try {
      const { data }: any = await createContactAPI(contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const listContact = createAsyncThunk(
  "list-contact",
  async (thunkApi) => {
    try {
      const { data }: any = await listContactAPI();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updateContact = createAsyncThunk(
  "update-contact",
  async (contact: any, thunkApi) => {
    try {
      const { data }: any = await updateContactAPI(contact.id, contact.name);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const removeContact = createAsyncThunk(
  "remove-contact",
  async (id: string, thunkApi) => {
    try {
      const { data }: any = await removeContactAPI(id);
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

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(CreateContact.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      CreateContact.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      CreateContact.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current.push(action.payload.data);
      }
    );

    builder.addCase(listContact.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      listContact.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      listContact.fulfilled,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.current = action.payload;
      }
    );

    builder.addCase(updateContact.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      updateContact.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      updateContact.fulfilled,
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

    builder.addCase(removeContact.pending, (state: initialStateSlice) => {
      state.loading = true;
    });
    builder.addCase(
      removeContact.rejected,
      (state: initialStateSlice, action: any) => {
        state.loading = false;
        state.error = action.error;
      }
    );
    builder.addCase(
      removeContact.fulfilled,
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

export default contactSlice.reducer;
