import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser } = appSlice.actions;

export const appTokenState = (state) => state['app'].token;
export const userSelector = (state) => state['app'].user;

export default appSlice.reducer;
