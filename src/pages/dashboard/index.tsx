import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout, SectionContainer } from "../../components";
import classes from "./dashboard.module.scss";
import { coursesList } from "../../store/features/courses/coursesActions";
import { CoursesState } from "../../ts/types/app-state-types";

const Dashboard = () => {
  const { courses } = useSelector<
  {
    course: CoursesState;
  },
  CoursesState
>((state) => state.course);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(coursesList() as any)
  }, []);

  return (
    <>
      <SectionContainer>
        <p className={classes.title}>Courses</p>
        <hr className={classes.fit} />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">Courses you teach</p>
        {courses && (
          courses.map((course) => (
            <p key={course.courseId}>cs {course.courseId} - {course.courseName}</p>
          ))
        )}
      </SectionContainer>
    </>
  );
};

export default (
  <MainLayout>
    <Dashboard />
  </MainLayout>
);
