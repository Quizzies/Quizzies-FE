import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponse,
  RegisterInput,
  UserProfileDto,
} from "../../../domain/dtos";
import { AuthState } from "../../../ts/types/app-state-types";
import { userLogin } from "./authActions";
import { getToken } from "../../../ts/utils/auth";
import { optionInputsErrors } from "../../../ts/utils/error-utils";

// initialize userToken from local storage
const userToken = getToken();

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken,
  errors: {},
  success: false,
};

const authSlice = createSlice<AuthState, any>({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.errors = {};
      state.success = false;
    },
    setCredentials: (
      state: AuthState,
      { payload }: PayloadAction<UserProfileDto>
    ) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending as any]: (state: AuthState) => {
      state.loading = true;
      state.errors = {};
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
    [userLogin.rejected as any]: (
      state: AuthState,
      { payload }: PayloadAction<optionInputsErrors<RegisterInput>>
    ) => {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions as any;

export default authSlice.reducer;
