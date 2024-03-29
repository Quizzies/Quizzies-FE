import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizResultDto } from "../../../../domain/dtos";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";

export const getQuizResults = createAsyncThunk<any, number>(
  "quizResults/get",
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quizzes/${quizId}/results`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as QuizResultDto;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);
