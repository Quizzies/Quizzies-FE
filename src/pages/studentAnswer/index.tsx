import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OutlineButton, SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { QuizQuestion } from '../../domain/models';
import { backendURL } from '../../ts/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StudentAnswer as StudentAnswerDTO } from '../../domain/dtos/studentAnswer';


interface QuizData {
  quizId: number;
  quizName: string;
  questions: QuizQuestion[];
  timeLimit: number;
}

const StudentAnswer = () => {
  const { id: quizId } = useParams<{ id: string }>();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${backendURL}/quizzes/${quizId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: QuizData = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Couldnt fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  const checkAnswerCorrectness = (question: QuizQuestion, studentAnswer: string) => {
    const correctAnswer = question.answers?.find(a => a.isCorrect);
    return studentAnswer === correctAnswer?.answerValue;
  };

  if (loading) return <Spinner type="spinner" />;

  if (!quizData) return <p>Quiz data not found</p>;

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <SectionContainer>
      <div>
        <h1>Results for {quizData.quizName}</h1>
        {quizData.questions.map(question => (
          <div key={question.questionId}>
            <p>{question.questionTxt}</p>
            <p>Your Answer: {question.questionId && studentAnswers[question.questionId]}</p>
            <p>
              {question.questionId && checkAnswerCorrectness(question, studentAnswers[question.questionId])
                ? 'Correct'
                : 'Incorrect'}
            </p>
          </div>
        ))}
      </div>
        <OutlineButton
        additionalStyles="button button-submit"
        value="Dashboard"
        onClick={handleBackToDashboard}
      />
    </SectionContainer>
  );
};

export default StudentAnswer;
