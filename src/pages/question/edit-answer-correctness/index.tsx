import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Input,
  OutlineButton,
  PrimaryButton,
  SectionContainer,
} from "../../../components";
import Spinner from "../../../components/common/spinner";
import { RootState } from "../../../store";
import { QuestionTypeEnum } from "../../../ts/enums";
import { updateQuizAnswers } from "../../../store/features/quiz/answer/quizAnswerAction";

export const EditAnswerCorrectness = () => {
  const {
    quizQuestion: { questionTxt, questionTypeId, loading },
    quizAnswer: { questionAnswers },
    quiz: { courseName, quizName },
  } = useSelector((state: RootState) => {
    return {
      quizQuestion: state.quizQuestion,
      quizAnswer: state.quizAnswer,
      quiz: state.quiz,
    };
  });

  let { questionId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    // navigate(`/course/${courseId}/create-quiz`);
  }

  function updateAnswers() {
    dispatch(
      updateQuizAnswers({
        form: questionAnswers,
        questionId: +questionId!,
      }) as any
    );
  }

  const displayUI = () => {
    if (questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE) {
      return (
        <>
          <p className="call-to-action left">
            From the choices created, which is the correct answer?
          </p>
          {questionAnswers.map((answer: any, idx: number) => {
            return (
              <div key={answer.answerValue + idx} className="mt-1">
                <Input
                  elementType="checkbox"
                  additionalStyles="m-0"
                  option={answer.answerValue}
                  label={answer.answerValue}
                  changed={(e) => console.log(e)}
                />
              </div>
            );
          })}
        </>
      );
    } else {
      <p className="call-to-action left">
        From the choices created, which are the correct answers?
      </p>;
      return (
        <>
          <p className="call-to-action left">
            From the choices created, which is the correct answer?
          </p>
          {questionAnswers.map((answer: any, idx: number) => {
            return (
              <div key={answer.answerValue + idx} className="mt-1">
                <Input
                  elementType="checkbox"
                  additionalStyles="m-0"
                  option={""}
                  label={answer.answerValue}
                  changed={() => {}}
                />
              </div>
            );
          })}
        </>
      );
    }
  };

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="py-0 px-0">
        <p>Course: {courseName}</p>
        <p>Quiz: {quizName}</p>
      </SectionContainer>

      <SectionContainer additionalStyles="pt-1 px-0">
        <div className="container form-w-sm">
          <SectionContainer additionalStyles="px-0">
            <p className="call-to-action left"> Question Text</p>
            <p>{questionTxt}</p>
          </SectionContainer>
          <SectionContainer additionalStyles="px-0">
            {displayUI()}
          </SectionContainer>
          <Flex>
            <>
              <OutlineButton
                additionalStyles="button button-submit"
                value="Back"
                onClick={goBack}
              />
              <PrimaryButton
                additionalStyles="button button-secondary button-submit"
                value="Next"
                onClick={updateAnswers}
              />
            </>
          </Flex>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default EditAnswerCorrectness;
