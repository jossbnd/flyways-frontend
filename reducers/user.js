import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { firstName: null, lastName: null, token: null, profilePicture: null, actualDestination: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    updateProfilePicture: (state, action) => {
      state.value.profilePicture = action.payload;
    },
    storeActualDestination: (state, action) => {
      state.value.actualDestination = action.payload;
    }
  },
});

export const { login, logout, updateProfilePicture, storeActualDestination } = userSlice.actions;
export default userSlice.reducer;
