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

  // Automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // Perform a refetch every 15 minutes
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (isFetching) return <Spinner type="spinner" />;

  const goToCourse = (courseId: number, courseName: string) => {
    const destination = userInfo?.userType === "T" 
      ? `/course/${courseId}`
      : `/student-quiz-selection/${courseId}`;
    navigate(destination, { state: { courseId, courseName } });
  };

  return (
    <>
      <SectionContainer>
        <p className="header-title">Courses</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">
          {userInfo?.userType === "T" ? "Courses you teach" : "Enrolled courses"}
        </p>
        {userInfo?.courses?.map((course) => (
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
