import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizQuestionDetail } from "../../../../domain/dtos";
import { QuizAnswer } from "../../../../domain/models";
import { QuizAnswerState } from "../../../../ts/types/app-state-types";
import { createQuizAnswers } from "./quizAnswerAction";

const initialState: QuizAnswerState = {
  loading: false,
  questionAnswers: [],
  errors: {},
  success: false,
};

const quizAnswerSlice = createSlice<QuizAnswerState, any>({
  name: "quizAnswer",
  initialState,
  reducers: {
    addAnswerChoice: (state: QuizAnswerState, { payload }: PayloadAction<QuizAnswer>) => {
      state.questionAnswers.push(payload)
    },
    removeAnswerChoice: (state: QuizAnswerState, { payload }: PayloadAction<number>) => {
      state.questionAnswers.splice(payload, 1);
    }
  },
  extraReducers: {
    // create quiz answer
    [createQuizAnswers.pending as any]: (state: QuizAnswerState) => {
      state.loading = true;
      state.errors = {};
    },
    [createQuizAnswers.fulfilled as any]: (
      state: QuizAnswerState,
      { payload }: PayloadAction<QuizQuestionDetail>
    ) => {
      state.loading = false;
      state.success = true;
      state.questionAnswers = payload.answers!;
    },
    [createQuizAnswers.rejected as any]: (state: QuizAnswerState, { payload }: any) => {
      state.loading = false;
      state.errors = payload;
    }
  },
});

export const { addAnswerChoice, removeAnswerChoice } = quizAnswerSlice.actions as any

export default quizAnswerSlice.reducer;
