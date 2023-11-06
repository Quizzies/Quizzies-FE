import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuizResultDto } from "../../../../domain/dtos";
import { QuizResultState } from "../../../../ts/types/app-state-types";
import { getQuizResults } from "./quizResultsAction";
import { updateQuiz } from "../quizAction";

const initialState: QuizResultState = {
  loading: false,
  quizId: 0,
  courseName: "",
  quizName: "",
  studentResults: [],
  errors: {},
  success: false,
};

const quizResultsSlice = createSlice<QuizResultState, any>({
  name: "quizResults",
  initialState,
  reducers: {},
  extraReducers: {
    // get quiz results
    [getQuizResults.pending as any]: (state: QuizResultState) => {
      state.loading = true;
      state.errors = {};
    },
    [getQuizResults.fulfilled as any]: (
      state: QuizResultState,
      { payload }: PayloadAction<QuizResultDto>
    ) => {
      state.loading = false;
      state.success = true;
      state.quizId = payload.quizId;
      state.courseName = payload.courseName;
      state.quizName = payload.quizName;
      state.courseName = payload.courseName;
      state.studentResults = payload.studentResults;
    },
    [getQuizResults.rejected as any]: (
      state: QuizResultState,
      { payload }: any
    ) => {
      state.loading = false;
      state.errors = payload;
    },
    // submitted quiz
    [updateQuiz.fulfilled as any]: () => initialState
  },
});

export default quizResultsSlice.reducer;
