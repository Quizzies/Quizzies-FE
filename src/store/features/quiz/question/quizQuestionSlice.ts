import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizDetail, QuizQuestionDetail } from "../../../../domain/dtos";
import { QuizQuestion } from "../../../../domain/models/quiz-question";
import { QuizQuestionState } from "../../../../ts/types/app-state-types";
import { createQuizAnswers, getQuizAnswers } from "../answer/quizAnswerAction";
import { getQuiz } from "../quizAction";
import { createQuizQuestion, getQuizQuestion } from "./quizQuestionAction";

const initialState: QuizQuestionState = {
  loading: false,
  questionTxt: "",
  questionTypeId: undefined,
  questionId: undefined,
  errors: {},
  success: false,
};

const quizQuestionSlice = createSlice<QuizQuestionState, any>({
  name: "quizQuestion",
  initialState,
  reducers: {},
  extraReducers: {
    // create quiz question
    [createQuizQuestion.pending as any]: (state: QuizQuestionState) => {
      state.loading = true;
      state.errors = {};
    },
    [createQuizQuestion.fulfilled as any]: (
      state: QuizQuestionState,
      { payload }: PayloadAction<QuizQuestion>
    ) => {
      state.loading = false;
      state.success = true;
      state.questionId = payload.questionId;
    },
    [createQuizQuestion.rejected as any]: (
      state: QuizQuestionState,
      { payload }: any
    ) => {
      state.loading = false;
      state.errors = payload;
    },

    // get quiz question
    [getQuizQuestion.pending as any]: (state: QuizQuestionState) => {
      state.loading = true;
      state.errors = {};
    },
    [getQuizQuestion.fulfilled as any]: (
      state: QuizQuestionState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.questionTxt = payload.questionTxt;
      state.questionTypeId = payload.questionTypeId;
    },
    [getQuizQuestion.rejected as any]: (
      state: QuizQuestionState,
      { payload }: any
    ) => {
      state.loading = false;
      state.errors = payload;
    },

    // update question when answers to question are saved
    [createQuizAnswers.fulfilled as any]: (
      state: QuizQuestionState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.questionTxt = payload.questionTxt;
      state.questionTypeId = payload.questionTypeId;
      state.questionId = payload.questionId;
      state.quizId = payload.quizId;
    },
    // get question answers
    [getQuizAnswers.fulfilled as any]: (
      state: QuizQuestionState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.questionId = payload.questionId;
      state.questionTxt = payload.questionTxt;
      state.questionTypeId = payload.questionTypeId;
    },
  },
});

export default quizQuestionSlice.reducer;
