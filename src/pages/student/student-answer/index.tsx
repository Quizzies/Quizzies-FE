import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineButton, SectionContainer } from "../../../components";
import Spinner from "../../../components/common/spinner";
import { studQuizResultdto } from "../../../domain/dtos";
import { backendURL } from "../../../ts/constants";
import { getToken } from "../../../ts/utils/auth";

const StudentAnswer = () => {
  const [quizResult, setQuizResult] = useState<studQuizResultdto | null>(null);
  const [loading, setLoading] = useState(true);

  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${backendURL}/responses/${quizId}/result`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setQuizResult(data);
      } catch (error) {
        console.error("Could not fetch quiz results:", error);
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
    return <p>Quiz results not found.</p>;
  }

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const { courseId, courseName, questions, totalScore } = quizResult;

  return (
    <SectionContainer>
      <div>
        <p>{"cs " + courseId + " - " + courseName}</p>
        <p className="mt-2">Total quyestions {questions.length}</p>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              {question.questionName}{" "}
              <span style={{ color: question.isCorrect ? "green" : "red" }}>
                ({question.isCorrect ? "correct" : "incorrect"})
              </span>
            </p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      >
        <OutlineButton
          additionalStyles="button button-submit"
          value="Go to dashboard"
          onClick={handleBackToDashboard}
        />
      </div>
    </SectionContainer>
  );
};

export default StudentAnswer;
