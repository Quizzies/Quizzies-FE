import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizDetail, QuizQuestionDetail } from "../../../domain/dtos";
import { QuizState } from "../../../ts/types/app-state-types";
import { createQuiz, getQuiz, updateQuiz } from "./quizAction";
import { createQuizAnswers, getQuizAnswers } from "./answer/quizAnswerAction";

const initialState: QuizState = {
  loading: false,
  dueDate: "",
  quizDescription: "",
  quizName: "",
  timeLimit: 0,
  courseName: "",
  quizId: undefined,
  errors: {},
  success: false,
};

const quizSlice = createSlice<QuizState, any>({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: {
    // create quiz
    [createQuiz.pending as any]: (state: QuizState) => {
      state.loading = true;
      state.errors = {};
    },
    [createQuiz.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizDetail>
    ) => {
      state = { ...state, ...payload };
      state.loading = false;
      state.success = true;
    },
    [createQuiz.rejected as any]: (state: QuizState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    },
    // update quiz
    [updateQuiz.pending as any]: (state: QuizState) => {
      state.loading = true;
      state.errors = {};
    },
    [updateQuiz.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizDetail>
    ) => {
      // state updates trigger a rerender
      state.loading = false;
      state.success = true;
      state.courseName = payload.courseName;
      state.dueDate = payload.dueDate;
      state.quizDescription = payload.quizDescription;
      state.quizId = payload.quizId;
      state.quizName = payload.quizName;
    },
    [updateQuiz.rejected as any]: (state: QuizState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    },
    // get quiz
    [getQuiz.pending as any]: (state: QuizState) => {
      state.loading = true;
      state.errors = {};
    },
    [getQuiz.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.courseName = payload.courseName;
      state.dueDate = payload.dueDate;
      state.quizDescription = payload.quizDescription;
      state.quizId = payload.quizId;
      state.quizName = payload.quizName;
    },
    [getQuiz.rejected as any]: (state: QuizState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    },
    // update question when answers to question are saved
    [createQuizAnswers.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.courseName = payload.courseName;
      state.quizName = payload.quizName;
      state.quizId = payload.quizId;
    },
    // get question answers
    [getQuizAnswers.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.courseName = payload.courseName;
      state.quizName = payload.quizName;
      state.loading = false;
      state.success = true;
    },
  },
});

export default quizSlice.reducer;
