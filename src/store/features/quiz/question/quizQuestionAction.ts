import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizQuestionInput } from "../../../../domain/dtos/quiz-question-input";
import { QuizQuestion } from "../../../../domain/models/quiz-question";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";
import { QuizQuestionDetail } from "../../../../domain/dtos";

export const createQuizQuestion = createAsyncThunk<any, QuizQuestionInput>(
  "quiz-question/create",
  async (form, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quiz-questions`, {
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

      const data = (await response.json()) as QuizQuestion;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);

export const getQuizQuestion = createAsyncThunk<any, number>(
  "quiz-question/get",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/quiz-questions/${questionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        }
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

