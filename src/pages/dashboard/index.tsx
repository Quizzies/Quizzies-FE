import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SectionContainer } from "../../components";
import Spinner from "../../components/common/spinner";
import { RootState } from "../../store";
import { setCredentials } from "../../store/features/auth/authSlice";
import { useGetUserDetailsQuery } from "../../store/services/auth/atuhService";

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (isFetching) return <Spinner type="spinner" />;

  function goToCourse(courseId: number, courseName: string) {
    navigate(
      userInfo?.userType === "T" 
        ? `/course/${courseId}` 
        : `/student-quiz-selection/${courseId}`, 
      { state: { courseId, courseName } }
    );
  }

  return (
    <>
      <SectionContainer>
        <p className="header-title">Courses</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">
          {userInfo?.userType === "T"
            ? "Courses you teach"
            : "Enrolled courses"}
        </p>
        {userInfo?.courses &&
          userInfo.courses.map((course) => (
            <p
              onClick={() => goToCourse(course.courseId, course.courseName)}
              className="clickable"
              key={course.courseId}
            >
              cs {course.courseId} - {course.courseName}
            </p>
          ))}
      </SectionContainer>
    </>
  );
};

export default Dashboard;
