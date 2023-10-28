import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Form,
  Input,
  OutlineButton,
  PrimaryButton,
  SectionContainer,
} from "../../components";
import Spinner from "../../components/common/spinner";
import { RootState } from "../../store";
import { courseQuizzes } from "../../store/features/courses/detail/courseDetailActions";
import { QuizInput } from "../../domain/dtos";

const quizInput: QuizInput = {
  quizName: "",
  quizDescription: "",
  timeLimit: 0,
  dueDate: "",
};

export const Step1 = () => {
  const [form, setForm] = useState<QuizInput>(quizInput);

  const { courseName, loading } = useSelector(
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
    navigate(`/course/${courseId}`)
  }

  function next() {
    navigate(`/course/${courseId}/add-question`);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log(name, value)
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <SectionContainer>
      <SectionContainer additionalStyles="py-0 px-0">
        <p>{"cs " + courseId + " - " + courseName}</p>
      </SectionContainer>
      <Form submit={() => {}} additionalStyles="form-w-sm">
        <>
          <p className="call-to-action">Quiz name</p>
          <Input
            elementType="input"
            elementConfig={{
              type: "text",
              placeholder: "Enter quiz name",
            }}
            additionalStyles="input-align"
            value={form.quizName}
            // errors={errors?.email}
            name="quizName"
            changed={onChange}
          />
          <Input
            elementType="textarea"
            elementConfig={{
              type: "text",
              placeholder: "Quiz description",
            }}
            additionalStyles="input-align"
            value={form.quizDescription}
            // errors={errors?.password}
            name="quizDescription"
            changed={onChange}
          />
          <Input
            elementConfig={{
              type: "number",
              placeholder: form.timeLimit,
            }}
            additionalStyles="input-align"
            value={form.timeLimit}
            // errors={errors?.email}
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
            // errors={errors?.email}
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
      </Form>
    </SectionContainer>
  );
};

export default Step1;
