import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, UserProfileDto } from "../../../domain/dtos";
import { AuthState } from "../../../ts/types/app-state-types";
import { userLogin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken,
  errors: null,
  success: false,
};

const authSlice = createSlice<AuthState, any>({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.errors = null
    },
    setCredentials: (state: AuthState, { payload }: PayloadAction<UserProfileDto>) => {
      state.userInfo = payload
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending as any]: (state: AuthState) => {
      state.loading = true;
      state.errors = null;
    },
    [userLogin.fulfilled as any]: (
      state: AuthState,
      { payload }: PayloadAction<AuthResponse>
    ) => {
      state.loading = false;
      state.userInfo = { ...payload, ...{ userToken: undefined } };
      state.userToken = payload.userToken;
      state.success = true;
    },
    [userLogin.rejected as any]: (state: AuthState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions as any

export default authSlice.reducer;
