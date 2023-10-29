import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddChoiceBox,
  Flex,
  OutlineButton,
  PrimaryButton,
  SectionContainer,
} from "../../../components";
import Spinner from "../../../components/common/spinner";
import { RootState } from "../../../store";
import { getQuizQuestion } from "../../../store/features/quiz/question/quizQuestionAction";
import { addAnswerChoice, removeAnswerChoice } from "../../../store/features/quiz/answer/quizAnswerSlice";
import { QuestionTypeEnum } from "../../../ts/enums";
import { createQuizAnswers } from "../../../store/features/quiz/answer/quizAnswerAction";

export const AddChoices = () => {
  const {
    quizQuestion: {
      questionTxt,
      questionTypeId,
      loading
    },
    quizAnswer: { questionAnswers, success },
    quiz: { courseName, quizName }
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
    if (questionId) dispatch(getQuizQuestion(+questionId) as any);
  }, [questionId]);

  useEffect(() => {
    if (success === true) {
      navigate(`/question/${questionId}/edit`);
    }
  }, [success]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    // navigate(`/course/${courseId}/create-quiz`);
  }

  function AddQuizAnswers() {
    dispatch(createQuizAnswers({
      form: questionAnswers,
      questionId: +questionId!
    }) as any)
  }

  const addAnswer = (answerValue: string) => {
    dispatch(
      addAnswerChoice({
        answerValue,
        isCorrect: false,
      }) as any
    );
  };

  const deleteAnswer = (idx: number) => {
    dispatch(
      removeAnswerChoice(idx) as any
    );
  }

  const displayUI = () => {
    if (questionTypeId !== QuestionTypeEnum.SHORT_ANSWER) {
      return (
        <SectionContainer additionalStyles="pt-1 px-0">
          <p className="call-to-action left">Choices</p>
          <div className="mb-2">
            {questionAnswers.map((answer: any, idx: number) => {
              return (
                <div key={answer.answerValue + idx}>
                  <p style={{ display: "inline", marginRight: 10 }}>
                    {answer.answerValue}
                  </p>
                  <span style={{ cursor: 'pointer' }} onClick={() => deleteAnswer(idx)}>&times;</span>
                </div>
              );
            })}
          </div>

          <p className="call-to-action left">Add answer choice</p>
          <AddChoiceBox addAnswer={addAnswer} />
        </SectionContainer>
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
          {displayUI()}
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
                onClick={AddQuizAnswers}
              />
            </>
          </Flex>
        </div>
      </SectionContainer>
    </SectionContainer>
  );
};

export default AddChoices;
