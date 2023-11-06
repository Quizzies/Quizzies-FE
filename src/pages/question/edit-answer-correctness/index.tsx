import { useEffect } from "react";
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
import { QuizAnswer } from "../../../domain/models";
import { RootState } from "../../../store";
import {
  getQuizAnswers,
  updateQuizAnswers,
} from "../../../store/features/quiz/answer/quizAnswerAction";
import { updateAnswerChoice } from "../../../store/features/quiz/answer/quizAnswerSlice";
import { QuestionTypeEnum } from "../../../ts/enums";

export const EditAnswerCorrectness = () => {
  const {
    quizQuestion: { questionTxt, questionTypeId },
    quizAnswer: { questionAnswers, loading, submitted },
    quiz: { courseName, quizName, quizId },
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

  useEffect(() => {
    if (questionId) {
      dispatch(getQuizAnswers(+questionId!) as any);
    }
  }, [questionId]);

  useEffect(() => {
    submitted && navigate(`/quiz/${quizId}/summary`)
  }, [submitted])

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    // navigate(`/course/${courseId}/create-quiz`);
  }

  function submitUpdatedAnswers() {
    dispatch(
      updateQuizAnswers({
        form: questionAnswers,
        questionId: +questionId!,
      }) as any
    );
  }

  function updateAnswer(
    id: number,
    option: QuestionTypeEnum.MULTIPLE_CHOICE | QuestionTypeEnum.SINGLE_CHOICE
  ) {
    const payload = {
      id,
      option,
    };

    dispatch(updateAnswerChoice(payload));
  }

  const displayUI = () => {
    if (questionTypeId === QuestionTypeEnum.SINGLE_CHOICE) {
      let options = [];
      options = questionAnswers.map((answer: QuizAnswer) => {
        return {
          checked: answer.isCorrect,
          name: answer.answerId,
          label: answer.answerValue,
        };
      });
      return (
        <>
          <p className="call-to-action left">
            From the choices created, which is the correct answer?
          </p>
          <div className="mt-1">
            <Input
              elementType="radio"
              additionalStyles="m-0"
              options={options}
              changed={(id: number) =>
                updateAnswer(id, QuestionTypeEnum.SINGLE_CHOICE)
              }
            />
          </div>
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
          {questionAnswers.map((answer: QuizAnswer, idx: number) => {
            return (
              <div key={answer.answerValue + idx} className="mt-1">
                <Input
                  elementType="checkbox"
                  additionalStyles="m-0"
                  option={""}
                  label={answer.answerValue}
                  changed={() =>
                    updateAnswer(
                      answer.answerId!,
                      QuestionTypeEnum.MULTIPLE_CHOICE
                    )
                  }
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
                onClick={submitUpdatedAnswers}
              />
            </>
          </Flex>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default EditAnswerCorrectness;
