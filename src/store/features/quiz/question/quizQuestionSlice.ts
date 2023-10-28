import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizQuestionState } from "../../../../ts/types/app-state-types";
import { createQuizQuestion } from "./quizQuestionAction";
import { QuizQuestion } from "../../../../domain/models/quiz-question";

const initialState: QuizQuestionState = {
  loading: false,
  courseName: '',
  questionTxt: '',
  questionTypeId: null,
  quizId: undefined,
  questionId: undefined,
  errors: {},
  success: false,
};

const quizQuestionSlice = createSlice<QuizQuestionState, any>({
  name: "quizQuestion",
  initialState,
  reducers: {},
  extraReducers: {
    // create quiz
    [createQuizQuestion.pending as any]: (state: QuizQuestionState) => {
      state.loading = true;
      state.errors = {};
    },
    [createQuizQuestion.fulfilled as any]: (
      state: QuizQuestionState,
      { payload }: PayloadAction<QuizQuestion>
    ) => {
      debugger
      state = { ...state, ...payload };
      state.loading = false;
      state.success = true;
    },
    [createQuizQuestion.rejected as any]: (state: QuizQuestionState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    },
    // update quiz
    // [updateQuiz.pending as any]: (state: QuizQuestionState) => {
    //   state.loading = true;
    //   state.errors = {};
    // },
    // [updateQuiz.fulfilled as any]: (
    //   state: QuizQuestionState,
    //   { payload }: PayloadAction<QuizDetail>
    // ) => { // state updates trigger a rerender
    //   state.loading = false;
    //   state.success = true;
    //   state.courseName = payload.courseName;
    //   state.dueDate = payload.dueDate;
    //   state.quizDescription = payload.quizDescription;
    //   state.quizId = payload.quizId;
    //   state.quizName = payload.quizName;
    // },
    // [updateQuiz.rejected as any]: (state: QuizQuestionState, { payload }: any) => {
    //   state.loading = false;
    //   state.errors = payload;
    // },
    // get quiz
    // [getQuiz.pending as any]: (state: QuizQuestionState) => {
    //   state.loading = true;
    //   state.errors = {};
    // },
    // [getQuiz.fulfilled as any]: (
    //   state: QuizQuestionState,
    //   { payload }: PayloadAction<QuizDetail>
    // ) => { // state updates trigger a rerender
    //   state.loading = false;
    //   state.success = true;
    //   state.courseName = payload.courseName;
    //   state.dueDate = payload.dueDate;
    //   state.quizDescription = payload.quizDescription;
    //   state.quizId = payload.quizId;
    //   state.quizName = payload.quizName;
    // },
    // [getQuiz.rejected as any]: (state: QuizQuestionState, { payload }: any) => {
    //   state.loading = false;
    //   state.errors = payload;
    // },
  },
});

export const { updateQuestionField } = quizQuestionSlice.actions as any

export default quizQuestionSlice.reducer;
