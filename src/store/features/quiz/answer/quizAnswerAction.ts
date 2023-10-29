import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizQuestionDetail } from "../../../../domain/dtos";
import { QuizAnswer } from "../../../../domain/models";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";

/**
 * This function affects all quiz components: answers, question, and quiz itself
 * By doing this, we will only need to make a single API call to the backend
*/
export const createQuizAnswers = createAsyncThunk<any, { questionId: number, form: QuizAnswer[] }>(
  "quiz-answers/create",
  async (input, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quiz-answers/${input.questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(input.form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as QuizQuestionDetail;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);

/**
 * This function affects all quiz components: answers, question, and quiz itself
 * By doing this, we will only need to make a single API call to the backend
*/
export const updateQuizAnswers = createAsyncThunk<any, { questionId: number, form: QuizAnswer[] }>(
  "quiz-answers/update",
  async (input, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quiz-answers/${input.questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(input.form),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as QuizQuestionDetail;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);