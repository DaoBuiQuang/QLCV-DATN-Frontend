import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null,
  authId: null, 
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setRole: (state, action) => {
    //   state.role = action.payload;
    // },
    setAuth: (state, action) => {
      state.authId = action.payload.authId;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.role = null;
      state.authId = null;
    },
  },
});

export const { setRole, setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
