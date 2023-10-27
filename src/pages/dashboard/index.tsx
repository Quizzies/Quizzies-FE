import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SectionContainer } from "../../components";
import { RootState } from "../../store";
import { setCredentials } from "../../store/features/auth/authSlice";
import { useGetUserDetailsQuery } from "../../store/services/auth/atuhService";
import classes from "./dashboard.module.scss";
import Spinner from "../../components/common/spinner";

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (isFetching) return <Spinner type="spinner" />;

  return (
    <>
      <SectionContainer>
        <p className={classes.title}>Courses</p>
        <hr className={classes.fit} />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">{ userInfo?.userType === 'T' ? 'Courses you teach' : 'Enrolled courses' }</p>
        {userInfo?.courses &&
          userInfo.courses.map((course) => (
            <p key={course.courseId}>
              cs {course.courseId} - {course.courseName}
            </p>
          ))}
      </SectionContainer>
    </>
  );
};

export default Dashboard;
