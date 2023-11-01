import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionContainer, OutlineButton } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { setCredentials } from '../../store/features/auth/authSlice';
import { useGetUserDetailsQuery } from '../../store/services/auth/atuhService';
import { courseQuizzes } from "../../store/features/courses/detail/courseDetailActions";

const StudQuizSelect = () => {
  const {
    courseDetail: { courseName, courseId, quizzes, loading },
    userInfo,
  } = useSelector((state: RootState) => {
    return {
      courseDetail: state.courseDetail,
      userInfo: state.auth.userInfo,
    };
  });

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
        {quizzes.length ? (
          quizzes.map((quiz) => (
            <div key={quiz.quizName} className="mb-2">
              {userInfo?.userType === "S" && (
                <>
                  <p className="mb-0.5">{quiz.isPosted ? "Status: Posted" : "Status: Incomplete"}</p>
                  <p className="p-primary clickable mb-0.5">{quiz.quizName}</p>
                  <p className="light-grey mb-0.5">{quiz.dueDate}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </SectionContainer>
      <OutlineButton additionalStyles="stack-end" value="Back" onClick={goBack}></OutlineButton>
    </>
  );
};

export default StudQuizSelect;