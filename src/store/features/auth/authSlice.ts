import { createSlice } from "@reduxjs/toolkit";
import { AuthResponse } from "../../../domain/dtos";
import { AuthState } from "../../../ts/types/app-state-types";
import { Payload } from "../../payload";
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
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending as any]: (state: AuthState) => {
      state.loading = true;
      state.errors = null;
    },
    [userLogin.fulfilled as any]: (
      state: AuthState,
      { payload }: Payload<AuthResponse>
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

export default authSlice.reducer;
