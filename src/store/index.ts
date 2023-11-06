import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/courses/coursesSlice";
import courseDetailReducer from "./features/courses/detail/courseDetailSlice";
import quizReducer from "./features/quiz/quizSlice";
import quizResultsReducer from './features/quiz/quiz-results/quizResultsSlice';
import quizQuestionReducer from "./features/quiz/question/quizQuestionSlice";
import quizAnswerReducer from "./features/quiz/answer/quizAnswerSlice";
import questionTypesReducer from "./features/quiz/question-types/questionTypesSlice";
import { authApi } from "./services/auth/atuhService";

const combinedReducer = combineReducers({
  auth: authReducer,
  courseDetail: courseDetailReducer,
  course: courseReducer,
  quiz: quizReducer,
  quizResults: quizResultsReducer,
  quizQuestion: quizQuestionReducer,
  quizAnswer: quizAnswerReducer,
  questionTypes: questionTypesReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') { // reset the state
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
