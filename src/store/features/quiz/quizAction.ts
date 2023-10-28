import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizDetail, QuizInput } from "../../../domain/dtos";
import { backendURL } from "../../../ts/constants";
import { getToken } from "../../../ts/utils/auth";
import { setErroMapping } from "../../../ts/utils/error-utils";

export const createQuiz = createAsyncThunk<any, QuizInput>(
  "quiz/create",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as QuizDetail;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);
