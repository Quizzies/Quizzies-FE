import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionContainer, OutlineButton } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { courseQuizzes } from '../../store/features/courses/detail/courseDetailActions';
import { QuizOverview } from '../../domain/dtos';

const StudQuizSelect: React.FC = () => {
  const { loading, courseName, courseId, quizzes } = useSelector(
    (state: RootState) => state.courseDetail
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(courseQuizzes(Number(id)) as any);
    }
  }, [id, dispatch]);

  useEffect(() => {
    console.log("Quizzes:", quizzes); //remove after logging
  }, [quizzes]);

  if (loading) return <Spinner type="spinner" />;

  const getStatus = (quiz: QuizOverview) => {
    const now = new Date();
    const dueDate = new Date(quiz.dueDate);
    return now > dueDate ? 'Past Due' : 'Pending';
  };

  const goBack = () => navigate('/');

  return (
    <>
      <SectionContainer additionalStyles="pb-0.5">
        <p>{`CS ${courseId} - ${courseName}`}</p>
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0 mb-2">
        <p className="header-title">Quizzes</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        {quizzes.map((quiz) => (
          <React.Fragment key={quiz.quizId}>
            <p className="p-primary">Status: {getStatus(quiz)}</p>
            <div className="mb-1">
              <p
                className="my-0 clickable"
                onClick={() => navigate(`/student-takeQuiz/${quiz.quizId}`, {
                  state: { courseId: courseId, courseName: courseName },
                })}
              >
                {quiz.quizName}
              </p>
              <span className="light-grey my-0">
                Due Date: {new Intl.DateTimeFormat('en-US').format(new Date(quiz.dueDate))}
              </span>
            </div>
          </React.Fragment>
        ))}
      </SectionContainer>
      <OutlineButton
        additionalStyles="stack-end"
        value="Back"
        onClick={goBack}
      />
    </>
  );
};

export default StudQuizSelect;
