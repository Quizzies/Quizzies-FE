import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseDto } from "../../../domain/dtos";
import { backendURL } from "../../../ts/constants";
import { setErroMapping } from "../../../ts/utils/error-utils";

export const coursesList = createAsyncThunk<any, void>(
  "course/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as CourseDto[];

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);
