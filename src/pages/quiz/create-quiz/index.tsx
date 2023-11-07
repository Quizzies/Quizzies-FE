import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { date, number, object, string } from "yup";
import {
  FInput,
  Flex,
  OutlineButton,
  PrimaryButton,
  SectionContainer,
} from "../../../components";
import Spinner from "../../../components/common/spinner";
import { QuizInput } from "../../../domain/dtos";
import { RootState } from "../../../store";
import { courseQuizzes } from "../../../store/features/courses/detail/courseDetailActions";
import { createQuiz } from "../../../store/features/quiz/quizAction";

const quizSchema = object({
  quizName: string().required(),
  quizDescription: string().required(),
  timeLimit: number().positive().required(),
  dueDate: date().default(() => new Date()),
});

export const CreateQuiz = () => {
  const {
    quiz: { loading, dueDate, quizDescription, timeLimit, quizName, quizId },
    courseDetail: { courseName },
  } = useSelector((state: RootState) => {
    return {
      quiz: state.quiz,
      courseDetail: state.courseDetail,
    };
  });

  let { courseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) dispatch(courseQuizzes(+courseId) as any);
  }, [courseId]);

  useEffect(() => {
    if (quizId !== undefined) {
      navigate(`/quiz/${quizId}/add-question`);
    }
  }, [quizId]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    navigate(`/course/${courseId}`);
  }

  const handleChange = (field: string) => (evt: any) => {};

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="py-0 px-0">
        <p>{"cs " + courseId + " - " + courseName}</p>
      </SectionContainer>
      <Formik<QuizInput>
        initialValues={{
          quizName,
          dueDate,
          quizDescription,
          timeLimit,
        }}
        validationSchema={quizSchema}
        onSubmit={(values) => {
          values.courseId = +courseId!;
          dispatch(createQuiz(values) as any);
        }}
      >
        <Form className="container form-w-sm">
          <Field
            type="text"
            label="Name"
            name="quizName"
            component={FInput}
            placeholder="Enter name"
            additionalStyles="input-align"
            onChange={handleChange("quizName")}
            value={quizName}
          />
          <Field
            type="textarea"
            label="Description"
            name="quizDescription"
            component={FInput}
            placeholder="Enter description"
            additionalStyles="input-align"
            onChange={handleChange("quizDescription")}
            value={quizDescription}
          />
          <Field
            type="number"
            label="Time limit"
            name="timeLimit"
            component={FInput}
            additionalStyles="input-align"
            onChange={handleChange("timeLimit")}
            value={timeLimit}
          />
          <Field
            type="date"
            label="Due date"
            name="dueDate"
            component={FInput}
            additionalStyles="input-align"
            inputAdditionalStyles="pr-1"
            onChange={handleChange("dueDate")}
            value={dueDate}
          />
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
      </Formik>
    </SectionContainer>
  );
};

export default CreateQuiz;
