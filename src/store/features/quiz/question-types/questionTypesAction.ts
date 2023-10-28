import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuestionType } from "../../../../domain/models";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";

export const getQuestionTypes = createAsyncThunk<any, void>(
  "question-types/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/question-types`, {
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

      const data = (await response.json()) as QuestionType;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);
