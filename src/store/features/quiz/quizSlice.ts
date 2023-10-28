import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizDetail, QuizInput } from "../../../domain/dtos";
import { QuizState } from "../../../ts/types/app-state-types";
import { optionInputsErrors } from "../../../ts/utils/error-utils";
import { createQuiz } from "./quizAction";

const initialState: QuizState = {
  loading: false,
  dueDate: "",
  quizDescription: "",
  quizName: "",
  timeLimit: 0,
  courseName: "",
  errors: {},
  success: false,
};

const quizSlice = createSlice<QuizState, any>({
  name: "quiz",
  initialState,
  reducers: {
    updateField: (
      state: QuizState,
      { payload }: PayloadAction<optionInputsErrors<QuizInput>>
    ) => {
      state.errors = payload;
    },
  },
  extraReducers: {
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
  },
});

export default quizSlice.reducer;
