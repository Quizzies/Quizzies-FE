import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionContainer } from "../../components";
import { RootState } from "../../store";
import { coursesList } from "../../store/features/courses/coursesActions";
import classes from "./dashboard.module.scss";

const Dashboard = () => {
  const { courses } = useSelector((state: RootState) => state.course);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coursesList() as any);
  }, []);

  return (
    <>
      <SectionContainer>
        <p className={classes.title}>Courses</p>
        <hr className={classes.fit} />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">Courses you teach</p>
        {courses &&
          courses.map((course) => (
            <p key={course.courseId}>
              cs {course.courseId} - {course.courseName}
            </p>
          ))}
      </SectionContainer>
    </>
  );
};

export default Dashboard