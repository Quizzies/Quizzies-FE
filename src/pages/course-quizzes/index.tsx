import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineButton, SectionContainer } from "../../components";
import Spinner from "../../components/common/spinner";
import { RootState } from "../../store";
import { courseQuizzes } from "../../store/features/courses/detail/courseDetailActions";

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
    console.log(userInfo)
    if (id) dispatch(courseQuizzes(+id) as any);
  }, [id]);

  if (loading) return <Spinner type="spinner" />;

  function createQuiz() {
    navigate(`/course/${id}/create-quiz`)
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <SectionContainer additionalStyles="pb-0.5">
        <p>{"cs " + courseId + " - " + courseName}</p>
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0 mb-2">
        <p className="header-title">Courses</p>
        <hr className="fit" />
      </SectionContainer>
      <SectionContainer additionalStyles="py-0">
        <p className="p-primary">Quizzes</p>
      </SectionContainer>
      <SectionContainer additionalStyles="pt-0">
        <p className="p-primary">
          {userInfo?.userType === "T" ? "Your quizzes" : "Pending"}
        </p>
        {quizzes.length &&
          quizzes.map((quiz) => (
            <div key={quiz.quizName} className="mb-1">
              <p
                // onClick={() => goToCourse(course.courseId)}
                className="clickable my-0"
              >
                {quiz.quizName}
              </p>
              <p className="light-grey my-0">{quiz.dueDate}</p>
            </div>
          ))}

        {userInfo?.userType === "T" ? (
          <p className="p-primary" onClick={createQuiz}>Create a quiz</p>
        ) : null}
      </SectionContainer>
      <OutlineButton additionalStyles="stack-end" value="Back" onClick={goBack}></OutlineButton>
    </>
  );
};

export default CourseQuizzes;
