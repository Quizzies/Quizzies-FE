import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizDetail, QuizQuestionDetail } from "../../../domain/dtos";
import { QuizState } from "../../../ts/types/app-state-types";
import { createQuizAnswers, getQuizAnswers } from "./answer/quizAnswerAction";
import { createQuiz, getQuiz, updateQuiz } from "./quizAction";

const initialState: QuizState = {
  loading: false,
  dueDate: "",
  quizDescription: "",
  quizName: "",
  timeLimit: 0,
  courseName: "",
  isPosted: false,
  quizId: undefined,
  questions: [],
  errors: {},
  success: false,
  updated: false,
};

const quizSlice = createSlice<QuizState, any>({
  name: "quiz",
  initialState,
  reducers: {
    updateIsPosted: (state: QuizState, { payload }: PayloadAction<boolean>) => {
      state.isPosted = payload;
    },
  },
  extraReducers: {
    // create quiz
    [createQuiz.pending as any]: (state: QuizState) => {
      state.loading = true;
      state.errors = {};
      state.updated = false;
    },
    [createQuiz.fulfilled as any]: (
      state: QuizState,
      { payload }: PayloadAction<QuizDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.courseName = payload.courseName;
      state.dueDate = payload.dueDate;
      state.quizDescription = payload.quizDescription;
      state.quizId = payload.quizId;
      state.timeLimit = 0;
      state.questions = [];
      state.quizName = payload.quizName;
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
      _: PayloadAction<QuizDetail>
    ) => {
      state.courseName = "";
      state.dueDate = "";
      state.quizDescription = "";
      state.quizId = undefined;
      state.quizName = "";
      state.loading = false;
      state.success = false;
      state.updated = true;
      state.isPosted = false;
      state.questions = [];
      state.errors = {};
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
      state.isPosted = payload.isPosted;
      state.timeLimit = payload.timeLimit;
      state.questions = payload.questions;
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

export const { updateIsPosted } = quizSlice.actions as any;

export default quizSlice.reducer;
