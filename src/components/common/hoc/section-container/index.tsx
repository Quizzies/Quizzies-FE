import { ReactNode } from "react";

type Props = {
  id?: string;
  additionalStyles?: string;
  children?: ReactNode;
}

export const SectionContainer : React.FC<Props> = (props) => {
  return (
    <section id={props.id && props.id} className={`container ${props.additionalStyles}`}>
      { props.children }
    </section>
  );
}

export default SectionContainer;