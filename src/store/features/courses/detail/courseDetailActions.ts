import { createAsyncThunk } from "@reduxjs/toolkit";
import { CourseOverview } from "../../../../domain/dtos";
import { backendURL } from "../../../../ts/constants";
import { getToken } from "../../../../ts/utils/auth";
import { setErroMapping } from "../../../../ts/utils/error-utils";

/**
 * Returns a list of quizzes based on the role of the user (determined by JWT)
 */
export const courseQuizzes = createAsyncThunk<any, number>(
  "courseDetail/list-quizzes",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/courses/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = (await response.json()) as CourseOverview;

      return data;
    } catch (error: any) {
      const errorResponse = setErroMapping(error);
      return rejectWithValue(errorResponse);
    }
  }
);
