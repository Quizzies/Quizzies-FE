import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizQuestionInput } from "../../../../domain/dtos/quiz-question-input";
import { QuizQuestion } from "../../../../domain/models/quiz-question";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";

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

// export const updateQuiz = createAsyncThunk<any, QuizInput>(
//   "quiz/update",
//   async (form, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${backendURL}/quizzes`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify(form),
//       });

//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error);
//       }

//       const data = (await response.json()) as QuizDetail;

//       return data;
//     } catch (error: any) {
//       const errorResponse = setErroMapping(error);
//       return rejectWithValue(errorResponse);
//     }
//   }
// );

// export const getQuiz = createAsyncThunk<any, number>(
//   "quiz/get",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${backendURL}/quizzes/${courseId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         }
//       });

//       if (!response.ok) {
//         const error = await response.text();
//         throw new Error(error);
//       }

//       const data = (await response.json()) as QuizDetail;

//       return data;
//     } catch (error: any) {
//       const errorResponse = setErroMapping(error);
//       return rejectWithValue(errorResponse);
//     }
//   }
// );
