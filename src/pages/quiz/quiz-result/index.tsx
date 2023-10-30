import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input, PrimaryButton, SectionContainer } from "../../../components";
import Spinner from "../../../components/common/spinner";
import { RootState } from "../../../store";
import { getQuiz, updateQuiz } from "../../../store/features/quiz/quizAction";
import { updateIsPosted } from "../../../store/features/quiz/quizSlice";

export const QuizResult = () => {
  const {
    quiz,
    quiz: {
      courseName,
      dueDate,
      quizDescription,
      quizName,
      timeLimit,
      isPosted,
      questions,
      loading,
      updated,
    },
  } = useSelector((state: RootState) => {
    return { quiz: state.quiz };
  });

  let { quizId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) {
      dispatch(getQuiz(+quizId!) as any);
    }
  }, [quizId]);

  useEffect(() => {
    updated && navigate('/')
  }, [updated]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    // navigate(`/course/${courseId}/create-quiz`);
  }

  // function goToQuestion(questionId: number) {
  //   navigate(`/course/${courseId}/create-quiz`);
  // }

  // submitting the quiz will only update the isPosted property
  function submit() {
    const form = {
      quiz,
      quizId: +quizId!,
    };
    dispatch(updateQuiz(form) as any);
  }

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="px-0">
        <p>Course: {courseName}</p>
        <p className="mt-2">Quiz: {quizName}</p>
        <p className="grey-small-text">description: {quizDescription}</p>
        <p className="grey-small-text">time limit: {timeLimit} minutes</p>
        <p className="grey-small-text">due date: {dueDate}</p>
      </SectionContainer>

      <SectionContainer additionalStyles="px-0 py-0">
        {questions!.map((question, idx) => (
          <div className="my-2">
            <p className="call-to-action left">Question {idx + 1}</p>
            <p
              //  onClick={() => goToQuestion(question.questionId)}
              className="clickable"
            >
              Quiz: {question.questionTxt}
            </p>
          </div>
        ))}
      </SectionContainer>

      <SectionContainer additionalStyles="pt-1 px-0">
        <Input
          elementType="checkbox"
          additionalStyles="mb-2"
          option={""}
          label="Post this quiz"
          changed={() => dispatch(updateIsPosted(!isPosted))}
        />

        <PrimaryButton
          additionalStyles="button button-secondary button-submit m-0"
          value="Submit"
          onClick={submit}
        />
      </SectionContainer>
    </SectionContainer>
  );
};

export default QuizResult;
