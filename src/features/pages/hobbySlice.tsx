import { createSlice } from "@reduxjs/toolkit";

// return reducer & actions
const hobbies = createSlice({
  name: "hobbies",
  initialState: [],
  reducers: {
    // actions
    addHobbies: (state: any, action: any) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = hobbies;
export const { addHobbies } = actions;
export default reducer;
