import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { OutlineButton, PrimaryButton, SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { getQuiz } from '../../store/features/quiz/quizAction';

const quizQuestionSchema = object({
  answer: string().required('Required field'),
});

const StudentTakeQuiz = () => {
  const { quizNumber } = useParams<{ quizNumber?: string }>();
  const quizId = quizNumber ? parseInt(quizNumber) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, quizName, courseName, courseId, questions, timeLimit } = useSelector((state: RootState) => state.quiz);
  const [timer, setTimer] = useState(timeLimit);

  useEffect(() => {
    if (quizId) {
      dispatch<any>(getQuiz(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    setTimer(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timer === 0) {
      console.log('Timer ending log');
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  if (loading) return <Spinner type="spinner" />;

  const goBack = () => navigate(-1);
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const currentQuestion = questions && questions.length > 0 ? questions[0].questionTxt : 'Loading question...';

  return (
    <SectionContainer>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{`${courseId} - ${courseName}`}</h1>
        <span>Time left: {timer}</span>
      </div>
      <Formik
        initialValues={{ selectedChoice: '' }}
        validationSchema={quizQuestionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <div className="font-semibold mb-4">Question: {currentQuestion}</div>
            <div className="mb-6">
              {questions && questions.length > 0 && questions[0].answers.map((answer, index) => (
                <div key={index} className="mb-2">
                  <label className="flex items-center">
                    <Field
                      type="radio"
                      name="selectedChoice"
                      value={answer.answerValue}
                      checked={values.selectedChoice === answer.answerValue}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {answer.answerValue}
                  </label>
                </div>
              ))}
            </div>
            {errors.selectedChoice && touched.selectedChoice && <div className="text-red-500">{errors.selectedChoice}</div>}
            <div className="flex justify-around items-center mt-4">
              <OutlineButton
                additionalStyles="button button-submit"
                value="Back"
                onClick={goBack}
              />
              <PrimaryButton
                additionalStyles="button button-secondary"
                value="Next"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </SectionContainer>
  );
};

export default StudentTakeQuiz;
