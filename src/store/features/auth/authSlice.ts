import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../domain/models";
import { userLogin } from "./authActions";
import { AuthResponse } from "../../../domain/dtos";
import { Payload } from "../../payload";

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState: User = {
  loading: false,
  userInfo: null,
  userToken,
  errors: null,
  success: false,
};

const authSlice = createSlice<User, any>({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending as any]: (state: User) => {
      state.loading = true
      state.errors = null
    },
    [userLogin.fulfilled as any]: (state: User, { payload }: Payload<AuthResponse>) => {
      state.loading = false
      state.userInfo = {...payload, ...{userToken: undefined}}
      state.userToken = payload.userToken
      state.success = true
    },
    [userLogin.rejected as any]: (state: User, { payload }: any) => {
      state.loading = false
      state.errors = payload
    },
  },
});

export default authSlice.reducer;
