import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionType } from "../../../../domain/models";
import { QuestionTypeState } from "../../../../ts/types/app-state-types";
import { getQuestionTypes } from "./questionTypesAction";

const initialState: QuestionTypeState = {
  loading: false,
  questionTypes: [],
  errors: {},
  success: false,
};

const questionTypesSlice = createSlice<QuestionTypeState, any>({
  name: "questionTypes",
  initialState,
  reducers: {},
  extraReducers: {
    // create quiz
    [getQuestionTypes.pending as any]: (state: QuestionTypeState) => {
      state.loading = true;
      state.errors = {};
    },
    [getQuestionTypes.fulfilled as any]: (
      state: QuestionTypeState,
      { payload }: PayloadAction<QuestionType[]>
    ) => {
      state.questionTypes = payload;
      state.loading = false;
      state.success = true;
    },
    [getQuestionTypes.rejected as any]: (
      state: QuestionTypeState,
      { payload }: any
    ) => {
      state.loading = false;
      state.errors = payload;
    },
  },
});

export default questionTypesSlice.reducer;
