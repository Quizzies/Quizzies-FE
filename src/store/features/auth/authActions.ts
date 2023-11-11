import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, RegisterInput } from "../../../domain/dtos";
import { backendURL } from "../../../ts/constants";
import { setErroMapping } from "../../../ts/utils/error-utils";

export const userLogin = createAsyncThunk<any, RegisterInput>(
  "auth/login",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as AuthResponse;

      localStorage.setItem('userToken', data.userToken);

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error)
      return rejectWithValue(errorResponse);
    }
  }
);
