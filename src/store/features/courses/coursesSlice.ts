import { createSlice } from "@reduxjs/toolkit";
import { CourseDto } from "../../../domain/dtos";
import { CoursesState } from "../../../ts/types/app-state-types";
import { Payload } from "../../payload";
import { coursesList } from "./coursesActions";

const initialState: CoursesState = {
  loading: false,
  courses: [],
  errors: null,
  success: false,
};

const courseSlice = createSlice<CoursesState, any>({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    [coursesList.pending as any]: (state: CoursesState) => {
      state.loading = true
      state.errors = null
    },
    [coursesList.fulfilled as any]: (state: CoursesState, { payload }: Payload<CourseDto[]>) => {
      state.loading = false
      state.courses = payload
      state.success = true
    },
    [coursesList.rejected as any]: (state: CoursesState, { payload }: any) => {
      state.loading = false
      state.errors = payload
    },
  },
});

export default courseSlice.reducer;
