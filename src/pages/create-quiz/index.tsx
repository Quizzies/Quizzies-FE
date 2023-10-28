import { useParams } from "react-router-dom";
import { SectionContainer } from "../../components";

export const CreateQuiz = () => {
  let params = useParams();
  console.log(params)

  return (
    <>
    <SectionContainer additionalStyles="pb-0.5">
      {/* <p>{"cs " + courseId + " - " + courseName}</p> */}
    </SectionContainer>
    </>
  )
};

export default CreateQuiz;
