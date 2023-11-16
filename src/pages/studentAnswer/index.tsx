import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OutlineButton, SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { QuizQuestion } from '../../domain/models';
import { backendURL } from '../../ts/constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StudentAnswer as StudentAnswerDTO } from '../../domain/dtos/studentAnswer';
import { QuestionTypeEnum } from '../../ts/enums';


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

  useEffect(() => {
    if (quizData) {
      const formattedAnswers = quizData.questions.reduce<{ [key: number]: string }>((acc, question) => {
        const storedAnswer = localStorage.getItem(`answer_${question.questionId}`);
        if (storedAnswer && typeof question.questionId !== 'undefined') {
          const studentAnswerDTO: StudentAnswerDTO = JSON.parse(storedAnswer);

          if (question.answers && question.questionTypeId === QuestionTypeEnum.MULTIPLE_CHOICE) {
            // mcq
            acc[question.questionId] = studentAnswerDTO.answerIds
              .map(id => question.answers?.find(a => a.answerId === id)?.answerValue)
              .filter(Boolean)
              .join(", ");
          } else if (question.answers) {
            //single choice
            acc[question.questionId] = question.answers.find(a => a.answerId === studentAnswerDTO.answerIds[0])?.answerValue || "No answer selected";

          }
        }
        return acc;
      }, {});

      setStudentAnswers(formattedAnswers);
    }
  }, [quizData]);
  

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
        {quizData.questions.map(question => {


          // CHECK QUESTION ID DEFINITION METHODS


          if (typeof question.questionId === 'undefined') return null;
  
          const correctAnswer = question.answers?.find(answer => answer.isCorrect)?.answerValue;


          //FETCH STUDs ANSWERS

          const studentAnswer = studentAnswers[question.questionId];
  
          return (
            <div key={question.questionId}>
              <p><b>Question:</b> {question.questionTxt}</p>
              <p><b>Correct Answer:</b> {correctAnswer}</p>
              <p><b>Your Answer:</b> {studentAnswer ? studentAnswer : "SHOULDN'T HAVE NO ANSWERS"}</p>
              <p>
                {checkAnswerCorrectness(question, studentAnswer)
                  ? <b style={{ color: 'green' }}>Correct</b>
                  : <b style={{ color: 'red' }}>Incorrect</b>}
              </p>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <OutlineButton
          additionalStyles="button button-submit"
          value="Dashboard"
          onClick={handleBackToDashboard}
        />
      </div>
    </SectionContainer>
  );
};

export default StudentAnswer;
