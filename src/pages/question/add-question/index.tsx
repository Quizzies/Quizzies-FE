import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { number, object, string } from "yup";
import {
  FInput,
  Flex,
  OutlineButton,
  PrimaryButton,
  SectionContainer,
  Select,
} from "../../../components";
import Spinner from "../../../components/common/spinner";
import { QuizQuestionInput } from "../../../domain/dtos/quiz-question-input";
import { RootState } from "../../../store";
import { getQuestionTypes } from "../../../store/features/quiz/question-types/questionTypesAction";
import { updateQuestionField } from "../../../store/features/quiz/question/quizQuestionSlice";
import { getQuiz } from "../../../store/features/quiz/quizAction";
import { createQuizQuestion } from "../../../store/features/quiz/question/quizQuestionAction";

const quizQuestionSchema = object({
  questionTypeId: number().required("Required field"),
  questionTxt: string().required("Required field"),
});

export const AddQuestion = () => {
  const {
    quizQuestion: { questionId, questionTxt, questionTypeId, loading },
    quiz: { courseId, courseName },
    questionTypes: { questionTypes },
  } = useSelector((state: RootState) => {
    return {
      quiz: state.quiz,
      quizQuestion: state.quizQuestion,
      questionTypes: state.questionTypes,
    };
  });

  let { quizId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getQuestionTypes() as any);
  }, []);

  useEffect(() => {
    if (quizId && courseName === '') dispatch(getQuiz(+quizId) as any);
  }, [quizId]);

  useEffect(() => {
    if (questionId !== undefined) {
      navigate(`/question/${questionId}/add-question`);
    }
  }, [questionId]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    navigate(`/course/${courseId}/create-quiz`);
  }

  const handleChange = (field: string) => (evt: any) => {
    dispatch(updateQuestionField({ field, value: evt.target.value }));
  };

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="py-0 px-0">
        <p>{courseName}</p>
      </SectionContainer>
      <Formik<QuizQuestionInput>
        initialValues={{
          questionTxt: questionTxt,
          questionTypeId: questionTypeId,
        }}
        validationSchema={quizQuestionSchema}
        onSubmit={(values) => {
          dispatch(createQuizQuestion(values) as any);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="container form-w-sm">
            <Field
              type="text"
              label="Name"
              name="questionTxt"
              component={FInput}
              placeholder="Enter question text"
              additionalStyles="input-align"
              onChange={handleChange("questionTxt")}
              value={questionTxt}
            />
            <Field name="questionTypeId">
              {({ field }: any) => ( // working with custom Select component
                <Select
                  {...field}
                  items={questionTypes.map((item) => {
                    return { id: item.questionTypeId, value: item.name };
                  })}
                  value="Select option"
                  onChange={(e: any) =>
                    setFieldValue("questionTypeId", e.target.value)
                  }
                ></Select>
              )}
            </Field>
            <Flex>
              <>
                <OutlineButton
                  additionalStyles="button button-submit"
                  value="Back"
                  onClick={goBack}
                />
                <PrimaryButton
                  type="submit"
                  additionalStyles="button button-secondary button-submit"
                  value="Next"
                />
              </>
            </Flex>
          </Form>
        )}
      </Formik>
    </SectionContainer>
  );
};

export default AddQuestion;
