import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, OutlineButton, SectionContainer } from "../../../components";
import Spinner from "../../../components/common/spinner";
import { RootState } from "../../../store";
import { getQuizResults } from "../../../store/features/quiz/quiz-results/quizResultsAction";

export const QuizResults = () => {
  const { courseName, loading, studentResults } = useSelector(
    (state: RootState) => state.quizResults
  );

  let { quizId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId) dispatch(getQuizResults(+quizId) as any);
  }, [quizId]);

  if (loading) return <Spinner type="spinner" />;

  function goBack() {
    navigate("/");
  }

  return (
    <>
      <SectionContainer additionalStyles="pb-0.5">
        <p>{courseName}</p>
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0 mb-2">
        <p className="header-title">Results</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">Students</p>
        {studentResults.map((studentResult) => (
          <div key={studentResult.fullName} className="mb-1">
            <Flex>
              <>
                <div>
                  <p className="my-0">{studentResult.fullName}</p>
                  <span className="light-grey my-0 mr-1">
                    {studentResult.submissionDate}
                  </span>
                </div>
                <p>Score {studentResult.totalScore}</p>
              </>
            </Flex>
          </div>
        ))}
      </SectionContainer>
      <OutlineButton
        additionalStyles="stack-end"
        value="Back"
        onClick={goBack}
      ></OutlineButton>
    </>
  );
};

export default QuizResults;
