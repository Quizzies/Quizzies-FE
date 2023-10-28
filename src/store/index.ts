import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import courseReducer from "./features/courses/coursesSlice";
import courseDetailReducer from "./features/courses/detail/courseDetailSlice";
import { authApi } from "./services/auth/atuhService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courseDetail: courseDetailReducer,
    course: courseReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
