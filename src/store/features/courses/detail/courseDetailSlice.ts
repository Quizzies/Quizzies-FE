import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseDetailState } from "../../../../ts/types/app-state-types";
import { courseQuizzes } from "./courseDetailActions";
import { updateQuiz } from "../../quiz/quizAction";

const initialState: CourseDetailState = {
  loading: false,
  courseId: 0,
  courseName: "",
  quizzes: [],
  errors: {},
  success: false,
};

const courseDetailSlice = createSlice<CourseDetailState, any>({
  name: "courseDetail",
  initialState,
  reducers: {},
  extraReducers: {
    // list courses for instructor or student
    [courseQuizzes.pending as any]: (state: CourseDetailState) => {
      state.loading = true;
      state.errors = {};
    },
    [courseQuizzes.fulfilled as any]: (
      state: CourseDetailState,
      { payload }: PayloadAction<CourseDetailState>
    ) => {
      state.loading = false;
      state.courseId = payload.courseId;
      state.courseName = payload.courseName;
      state.quizzes = payload.quizzes;
      state.success = true;
    },
    [courseQuizzes.rejected as any]: (
      state: CourseDetailState,
      { payload }: any
    ) => {
      state.loading = false;
      state.errors = payload;
    },
    // submitted quiz
    [updateQuiz.fulfilled as any]: () => initialState
  },
});

export default courseDetailSlice.reducer;
