import { IntersectBaseProps } from "../../../../ts/types/form-types";
import "./form.module.scss";

export const Form: React.FC<IntersectBaseProps> = ({
  submit,
  title,
  children,
  additionalStyles
}) => {
  return (
    <form
      onSubmit={submit}
      id="form"
      className={`container ${additionalStyles}`}
    >
      {title ? <p className="title">{title}</p> : null}
      {children}
    </form>
  );
};

export default Form;
