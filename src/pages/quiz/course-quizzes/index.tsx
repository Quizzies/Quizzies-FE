import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineButton, SectionContainer } from "../../../components";
import Spinner from "../../../components/common/spinner";
import { RootState } from "../../../store";
import { courseQuizzes } from "../../../store/features/courses/detail/courseDetailActions";

export const CourseQuizzes = () => {
  // https://stackoverflow.com/questions/53835816/decode-jwt-token-react
  // The session will be kept by decoding the JWT after page reload

  const {
    courseDetail: { courseName, courseId, quizzes, loading },
    userInfo,
  } = useSelector((state: RootState) => {
    return {
      courseDetail: state.courseDetail,
      userInfo: state.auth.userInfo,
    };
  });

  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(courseQuizzes(+id) as any);
  }, [id]);

  if (loading) return <Spinner type="spinner" />;

  function createQuiz() {
    navigate(`/course/${id}/create-quiz`);
  }

  function goBack() {
    navigate("/");
  }

  function goToQuizResults(quizId: number) {
    navigate(`/quiz/${quizId}/results`);
  }

  if (userInfo?.userType === "T") {
    return (
      <>
        <SectionContainer additionalStyles="pb-0.5">
          <p>{"cs " + courseId + " - " + courseName}</p>
        </SectionContainer>
        <SectionContainer additionalStyles="pt-0 mb-2">
          <p className="header-title">Quizzes</p>
          <hr className="fit" />
        </SectionContainer>
        <SectionContainer additionalStyles="pt-0">
          <p className="p-primary">
            {userInfo?.userType === "T" ? "Your quizzes" : "Pending"}
          </p>
          {quizzes.length &&
            quizzes.map((quiz) => (
              <div key={quiz.quizName} className="mb-1">
                {userInfo?.userType === "T" && (
                  <>
                    <p
                      onClick={() => goToQuizResults(quiz.quizId)}
                      className="clickable my-0"
                    >
                      {quiz.quizName}
                    </p>
                    <span className="light-grey my-0 mr-1">{quiz.dueDate}</span>

                    <span className="light-grey my-0">
                      {quiz.isPosted ? "(posted)" : "(incomplete)"}
                    </span>
                  </>
                )}
              </div>
            ))}

          {userInfo?.userType === "T" ? (
            <p className="p-primary clickable" onClick={createQuiz}>
              Create a quiz
            </p>
          ) : null}
        </SectionContainer>
        <OutlineButton
          additionalStyles="stack-end"
          value="Back"
          onClick={goBack}
        ></OutlineButton>
      </>
    );
  } else {
    return (
      <>
        <SectionContainer additionalStyles="pb-0.5">
          <p>{"CS " + courseId + " - " + courseName}</p>
        </SectionContainer>
        <SectionContainer additionalStyles="pt-0 mb-2">
          <p className="header-title">Quizzes</p>
          <hr className="fit" />
        </SectionContainer>
        <SectionContainer additionalStyles="pt-0">
          <p className="p-primary">{"Pending"}</p>
          {quizzes.length &&
            quizzes.map((quiz) => (
              <div key={quiz.quizName} className="mb-1">
                {userInfo?.userType === "T" && (
                  <>
                    <p
                      onClick={() => goToQuizResults(quiz.quizId)}
                      className="clickable my-0"
                    >
                      {quiz.quizName}
                    </p>
                    <span className="light-grey my-0 mr-1">{quiz.dueDate}</span>

                    <span className="light-grey my-0"></span>
                  </>
                )}
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
  }
};

export default CourseQuizzes;
