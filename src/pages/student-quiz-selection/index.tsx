import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionContainer, OutlineButton } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { setCredentials } from '../../store/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../store/services/auth/atuhService';
import { courseQuizzes } from "../../store/features/courses/detail/courseDetailActions";
import { useLocation } from 'react-router-dom';

const StudQuizSelect = () => {
  const location=useLocation();
  const stateFromLocation=location.state as {courseName?: string, courseId?: number};
  const {
    courseDetail: { courseName: courseNameRedux, courseId: courseIdRedux, quizzes, loading },
    userInfo,
  } = useSelector((state: RootState) => {
    return {
      courseDetail: state.courseDetail,
      userInfo: state.auth.userInfo,
    };
  });

  const courseName = stateFromLocation.courseName ?? courseNameRedux;
  const courseId = stateFromLocation.courseId ?? courseIdRedux;
  

  let { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(courseQuizzes(+id) as any);
  }, [id]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    navigate("/student-dashboard");
  } 
  
  function QuizSelect(quizNumber: number) {
    navigate(`/student-takeQuiz/${quizNumber}`);
  }


  return (
    <>
      <SectionContainer additionalStyles="pb-0.5">
        <p>{"CS " + courseId + " - " + courseName}</p>
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0 mb-2">
        <p className="header-title">Quizzes</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">Status: Pending</p>
        <div className="mb-1">
          <p 
            className="my-0 clickable"
            onClick={() => QuizSelect(1)}
          >
            Quiz 1
          </p>
          <span className="light-grey my-0">Due Date: November 1, 2023</span>
        </div>
        <p className="p-primary">Status: Incomplete</p>
        <div className="mb-1">
          <p 
            className="my-0 clickable"
            onClick={() => QuizSelect(2)}
          >
            Quiz 2
          </p>
          <span className="light-grey my-0">Due Date: November 2, 2023</span>
        </div>

      </SectionContainer>
      <OutlineButton
        additionalStyles="stack-end"
        value="Back"
        onClick={goBack}
      ></OutlineButton>
    </>
  );
};

export default StudQuizSelect;