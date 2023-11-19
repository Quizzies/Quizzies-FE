import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OutlineButton, SectionContainer } from '../../components';
import Spinner from '../../components/common/spinner';
import { backendURL } from '../../ts/constants';
import { studQuizResultdto } from '../../domain/dtos/student-quiz-result';
import { getToken } from '../../ts/utils/auth';

const StudentAnswer = () => {
  const { id: quizId } = useParams<{ id: string }>();
  const [quizResult, setQuizResult] = useState<studQuizResultdto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    const fetchQuizResults = async () => {
      setLoading(true);
      try {
        console.log(`Fetching results from: ${backendURL}/api/responses/${quizId}/result`);

        const response = await fetch(`${backendURL}/api/responses/${quizId}/result`, {
          headers: {
            'Authorization': `Bearer ${token}` // Token must be in header as per backend instructions
          }
        });
        
        console.log("Fetch response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setQuizResult(data);
      } catch (error) {
        console.error('Could not fetch quiz results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuizResults();
    }
  }, [quizId]);

  if (loading) return <Spinner type="spinner" />;

  if (!quizResult) {
    console.log("Quiz result is null or undefined");
    return <p>Quiz results not found.</p>;}

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <SectionContainer>
      <div>
        <h1>Results for {quizResult.quizName}</h1>
        {quizResult.questions.map((question, index) => (
          <div key={index}>
            <p><b>Question:</b> {question.questionTxt}</p>
            <p><b>Your Answer:</b> {question.responseValue || "No response"}</p>
            <p><b>Correct Answer:</b> {question.answerValue}</p>
            <p>
              {question.responseMark === 'C'
                ? <b style={{ color: 'green' }}>Correct</b>
                : <b style={{ color: 'red' }}>Incorrect</b>}
            </p>
          </div>
        ))}
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
