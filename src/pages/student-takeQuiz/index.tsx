import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { OutlineButton, PrimaryButton, SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { RootState } from '../../store';
import { getQuiz } from '../../store/features/quiz/quizAction';
import { updateAnswerChoice } from '../../store/features/quiz/answer/quizAnswerSlice';
import { QuestionTypeEnum } from '../../ts/enums';
import { QuizQuestion, QuizAnswer } from '../../domain/models';

const StudentTakeQuiz = () => {
  const navigate = useNavigate();
  const { quizNumber } = useParams<{ quizNumber?: string }>();
  const quizId = quizNumber ? parseInt(quizNumber, 10) : null;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const timeLimit = useSelector((state: RootState) => state.quiz.timeLimit);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState<number>(-1);
  const [answers, setAnswers] = useState<{ [key: string]: string | boolean }>({});

  
  
  useEffect(() => {
    console.log("checking for",questions); // Log to inspect the questions
  }, [questions]);

  useEffect(() => {
    // Check if quizId is available and fetch the quiz data
    if (quizId) {
      dispatch<any>(getQuiz(quizId));
    }
  }, [dispatch, quizId]);


  useEffect(() => {
    if (typeof timeLimit === 'number' && timeLimit > 0 && timer === -1) {
      console.log('Timer is set to:', timeLimit);
      setTimer(timeLimit);
    } else if (timeLimit === 0) {
      console.log('check async issue');
    }
  }, [timeLimit]);
  
  useEffect(() => {
    if (timer > 0) {
      console.log('Timer count down:', timer);
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
  
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      console.log('Time is up, auto submission and navigating to answer page');
      navigate(`/student-answer/${quizId}`);
    }
  }, [timer, navigate, quizId]);
  
  

  const handleAnswerChange = (key: string, value: string | boolean) => {
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  const handleButtonClick = () => {
    let hasAnsweredCurrentQuestion = false;
    const currentQuestionId = questions?.[currentQuestionIndex]?.questionId;
  
    if (currentQuestionId !== undefined) {
      const currentQuestionKey = `question_${currentQuestionId}`;
      
      if (questions?.[currentQuestionIndex]?.questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE) {
        hasAnsweredCurrentQuestion = Object.keys(answers).some(key => key.startsWith(currentQuestionKey) && answers[key] === true);
      } else {
        hasAnsweredCurrentQuestion = answers.hasOwnProperty(currentQuestionKey);
      }
    }
  
    if (!hasAnsweredCurrentQuestion) {
      alert("Please select an answer before proceeding.");
      return;
    }
  
    if (isLastQuestion) {
      console.log('Final Submission:', answers);
      navigate(`/student-answer/${quizId}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  

  const isLastQuestion = currentQuestionIndex === (questions?.length ?? 0) - 1;
  
  const handleNextQuestion = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("No questions left");
    }
  };  
  

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
  };

  const renderQuestionInput = (question: QuizQuestion | null) => {
    console.log("questionTypeId: ", question?.questionTypeId);
    if (!question || !question.answers || typeof question.questionId !== 'number') return null;
  
    return question.questionTypeId === QuestionTypeEnum.SINGLE_CHOICE 
      ? question.answers.map((answer: QuizAnswer) => (
          <div key={answer.answerId} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`question_${question.questionId}`}
                value={answer.answerValue}
                checked={answers[`question_${question.questionId}`] === answer.answerValue}
                onChange={(e) => question.questionId !== undefined && handleAnswerChange(`question_${question.questionId}`, e.target.value)}
              />
              {answer.answerValue}
            </label>
          </div>
        ))
      : question.answers.map((answer: QuizAnswer) => (
          <div key={answer.answerId} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name={`question_${question.questionId}_${answer.answerId}`}
                value={answer.answerValue}
                checked={answers[`question_${question.questionId}_${answer.answerId}`] === true}
                onChange={(e) => handleAnswerChange(`question_${question.questionId}_${answer.answerId}`, e.target.checked)}
              />
              {answer.answerValue}
            </label>
          </div>
        ));
  };
  
  

  if (loading) return <Spinner type="spinner" />;

  const currentQuestion = questions && questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <SectionContainer>
      <div className="flex justify-around items-center mt-4 mb-4">
      <h1 className="text-xl font-bold"></h1>
        <span>Time left: {timer !== undefined ? timer : 'Loading...'}</span>
      </div>
      <div>
        <div className="font-semibold mb-4">Question: {currentQuestion?.questionTxt}</div>
        <div className="mb-6">{renderQuestionInput(currentQuestion)}</div>
        <OutlineButton additionalStyles="button button-submit" value="Back" onClick={() => navigate(-1)} />
        <PrimaryButton 
          additionalStyles="button button-secondary" 
          value={isLastQuestion ? "Submit" : "Next"} 
          type={"button" as any} 
          onClick={handleButtonClick} 
        />
      </div>
    </SectionContainer>
  );
};

export default StudentTakeQuiz;
