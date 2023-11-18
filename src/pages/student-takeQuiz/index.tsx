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
import { createStudAnswer } from '../../domain/dtos/studentAnswer';
import { backendURL } from '../../ts/constants';
import studentAnswer from '../studentAnswer';

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


  // reset to avoid permanently saved answers. Remove if useless
  useEffect(() => {
    return () => {
      setAnswers({});
      setCurrentQuestionIndex(0);
    };
  }, []);


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
      console.log('Time is up, navigating to answer page');
      navigate(`/student-answer/${quizId}`);
    }
  }, [timer, navigate, quizId]);
  
  

  const handleAnswerChange = (key: string, value: string | boolean) => {
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  const handleBackButtonClick = async () => {
    if (!questions || questions.length === 0 || currentQuestionIndex >= questions.length || !questions[currentQuestionIndex]) {
      console.error("Questions not loaded or index out of bounds");
      return;
  }

    const currentQuestion = questions[currentQuestionIndex];
  
    const previousQuestion = questions[currentQuestionIndex - 1];
    if (!previousQuestion) return;
  
    // Collect selected answers for the current question (similar logic as in handleButtonClick)
    let answerId: number[] = [];
    const currentQuestionKey = `question_${questions[currentQuestionIndex].questionId}`;
    const isMultipleChoice = questions[currentQuestionIndex].questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE;
  
    if (isMultipleChoice) {
      answerId = Object.keys(answers)
        .filter(key => key.startsWith(`${currentQuestionKey}_`) && answers[key] === true)
        .map(key => parseInt(key.split('_')[2]));
    } else {
      const answerValue = answers[currentQuestionKey];
      if (typeof answerValue === 'string' && answerValue !== "") {
        const selectedAnswer = questions[currentQuestionIndex].answers.find(answer => answer.answerValue === answerValue);
        if (selectedAnswer) {
          answerId = [selectedAnswer.answerId];
        }
      }
    }
  
    // Direction is set to 'B' for backward when clicking Back
    const direction = 'B';
    const studentAnswer = createStudAnswer(answerId, direction);

  try {
    const response = await fetch(`${backendURL}/api/responses/${currentQuestion.questionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ direction: 'F' })
    });    

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  } catch (error) {
    console.error('Error going back:', error);
  }
};
  

  /*const handleButtonClick = () => {
    saveCurrentAnswer();
    if (isLastQuestion) {
      console.log('Final Submission:', answers);
      navigate(`/student-answer/${quizId}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };*/


  // New button click

  const handleButtonClick = async () => {
    if (!questions || questions.length === 0 || currentQuestionIndex >= questions.length) {
      console.error("Questions not loaded or index out of bounds");
      return;
    }
  
    const currentQuestion = questions[currentQuestionIndex];
    
    let answerId: number[] = [];
    const currentQuestionKey = `question_${currentQuestion.questionId}`;
    const isMultipleChoice = currentQuestion.questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE;
  
    if (isMultipleChoice) {
      answerId = Object.keys(answers)
        .filter(key => key.startsWith(`${currentQuestionKey}_`) && answers[key] === true)
        .map(key => parseInt(key.split('_')[2]));
    } else {
      const answerValue = answers[currentQuestionKey];
      if (typeof answerValue === 'string' && answerValue !== "") {
        const selectedAnswer = currentQuestion.answers.find(answer => answer.answerValue === answerValue);
        if (selectedAnswer) {
          answerId = [selectedAnswer.answerId];
        }
      }
    }
  
    try {
      const studentAnswer = createStudAnswer(answerId, 'F');
      const response = await fetch(`${backendURL}/api/responses/${currentQuestion.questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentAnswer)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.isCompleted) {
        // Quiz complete so skip to answer page
        console.log('TESTING');
        navigate(`/student-answer/${quizId}`);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } catch (error) {
      console.error('Error:', error);
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

  /*const saveCurrentAnswer = () => {
    const currentQuestionId = questions?.[currentQuestionIndex]?.questionId;
  
    if (quizId !== null && currentQuestionId !== undefined && questions) {
      let answerId: (number[] | string[]) = [];
      const currentQuestionKey = `question_${currentQuestionId}`;
      const isMultipleChoice = questions[currentQuestionIndex]?.questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE;
  
      // MCQ
      if (isMultipleChoice) {
        answerId = Object.keys(answers)
          .filter(key => key.startsWith(`${currentQuestionKey}_`) && answers[key] === true)
          .map(key => parseInt(key.split('_')[2]));
      // SCQ
      } else {
        const answerValue = answers[currentQuestionKey];
        if (typeof answerValue === 'string' && answerValue !== "") {
          const selectedAnswer = questions[currentQuestionIndex].answers.find(answer => answer.answerValue === answerValue);
          if (selectedAnswer) {
            answerId = [selectedAnswer.answerId];
          }
        }
      }
  
      // Default answer
      if (answerId.length === 0) {
        answerId = ["No answer was provided for this question."];
      }
  
      const studentAnswer = createStudentAnswerDTO(quizId, currentQuestionId, answerId);

      // change from local storage to backend partial submit later (POST to backend & check response status)

      // Temp - For testing - Remove
      console.log('Saving answer:', studentAnswer);
      localStorage.setItem(`answer_${currentQuestionId}`, JSON.stringify(studentAnswer));
    }
  };*/
  
  const [showBackWarning, setShowBackWarning] = useState(false);

  
  
  
  
  

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
        <h1 className="text-xl font-bold">Quiz Time</h1>
        <span>Time left: {timer !== undefined ? timer : 'Loading...'}</span>
      </div>
      <div>
        <div className="font-semibold mb-4">Question: {currentQuestion?.questionTxt}</div>
        <div className="mb-6">{renderQuestionInput(currentQuestion)}</div>
        <div className="flexbox justify-between items-center px-4 button-container">
      <OutlineButton
        additionalStyles="button button-action"
        value="Back"
        onClick={handleBackButtonClick}
      />
      <PrimaryButton
        additionalStyles="button button-action"
        value={isLastQuestion ? "Submit" : "Next"}
        onClick={handleButtonClick}
      />
    </div>
      </div>
    </SectionContainer>
  );
};

export default StudentTakeQuiz;
