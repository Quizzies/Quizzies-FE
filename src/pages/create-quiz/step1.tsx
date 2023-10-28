import { Field, Form, Formik } from "formik";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { date, number, object, string } from "yup";
import {
  FInput,
  Flex,
  OutlineButton,
  PrimaryButton,
  SectionContainer
} from "../../components";
import Spinner from "../../components/common/spinner";
import { QuizInput } from "../../domain/dtos";
import { RootState } from "../../store";
import { courseQuizzes } from "../../store/features/courses/detail/courseDetailActions";

const quizSchema = object({
  quizName: string().required(),
  quizDescription: string().required(),
  timeLimit: number().positive().required(),
  dueDate: date().default(() => new Date()),
});

export const Step1 = () => {
  const { courseName, loading, errors } = useSelector(
    (state: RootState) => state.courseDetail
  );

  let { courseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) dispatch(courseQuizzes(+courseId) as any);
  }, [courseId]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    navigate(`/course/${courseId}`);
  }

  function next() {
    navigate(`/course/${courseId}/add-question`);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    // event.preventDefault();
    // const submitError = {
    //   dueDate: [] as string[],
    //   quizDescription: [] as string[],
    //   quizName: [] as string[],
    //   timeLimit: [] as string[],
    // };
    // let invalidForm = false;
    // if (form.quizName === "") {
    //   submitError.quizName.push("Required field");
    //   invalidForm = true;
    // }
    // if (form.quizDescription === "") {
    //   submitError.quizDescription.push("Required field");
    //   invalidForm = true;
    // }
    // if (form.timeLimit === 0) {
    //   submitError.timeLimit.push("Time limit must be greater than 0");
    //   invalidForm = true;
    // }
    // if (form.dueDate === "") {
    //   submitError.dueDate.push("Required field");
    //   invalidForm = true;
    // }
    // // setFormErrors({
    // //   ...formErrors,
    // //   ...submitError,
    // // });
    // if (!invalidForm) {
    //   dispatch(createQuiz(form) as any);
    // } else {
    //   // dispatch(setE)
    // }
  }

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="py-0 px-0">
        <p>{"cs " + courseId + " - " + courseName}</p>
      </SectionContainer>
      <Formik<QuizInput>
        initialValues={{
          quizName: "",
          dueDate: "",
          quizDescription: "",
          timeLimit: 0,
        }}
        validationSchema={quizSchema}
        onSubmit={(values) => {
          console.log(values);
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
          />
          <Field
            type="textarea"
            label="Description"
            name="quizDescription"
            component={FInput}
            placeholder="Enter description"
            additionalStyles="input-align"
          />
          <Field
            type="number"
            label="Time limit"
            name="timeLimit"
            component={FInput}
            additionalStyles="input-align"
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
      {/* <Form submit={submit} additionalStyles="form-w-sm">
        <>
          <Input
            elementConfig={{
              type: "number",
              placeholder: form.timeLimit,
            }}
            additionalStyles="input-align"
            value={form.timeLimit}
            errors={mergeErrors("timeLimit")}
            name="timeLimit"
            changed={onChange}
          />
          <Input
            elementConfig={{
              type: "date",
              placeholder: form.dueDate,
            }}
            additionalStyles="input-align"
            inputAdditionalStyles="pr-0.5"
            value={form.dueDate}
            errors={mergeErrors("dueDate")}
            name="dueDate"
            changed={onChange}
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
        </>
      </Form> */}
    </SectionContainer>
  );
};

export default Step1;
