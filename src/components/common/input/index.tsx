import { IntersectBaseProps } from "../../../ts/types/input-types";
import classes from "./input.module.scss";
import CheckBox from "./checkbox";
import RadioButtons from "./radio";

export const Input: React.FC<IntersectBaseProps> = (props) => {
  let inputElement = null;
  let inputClasses = [classes.inputElement, props.inputAdditionalStyles];

  if (props.errors && props.errors.length) {
    inputClasses = inputClasses.concat(classes.errorField);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.name}
          onChange={(e) => props.changed(e)}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          name={props.name}
          onChange={props.changed}
        />
      );
      break;
    case "radio":
      inputElement = (
        <RadioButtons inputs={props.options} onCheckChange={props.changed} />
      );
      break;
    case "checkbox":
      inputElement = (
        <CheckBox input={props.option} onCheckChange={props.changed} label={props.label!} />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={`${classes.formControl} ${props.additionalStyles}`}>
      {props.label && props.elementType !== 'checkbox' ? (
        <label className={classes.label}>{props.label}</label>
      ) : null}
      {inputElement}
      {props.errors &&
        props.errors.map((err) => (
          <p key={err} className={classes.errorMessage}>* {err}</p>
        ))}
    </div>
  );
};

export default Input;
