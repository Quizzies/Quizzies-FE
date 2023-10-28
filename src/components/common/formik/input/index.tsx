import { changeHandler } from "../../../../ts/types/app-types";
import classes from "./input.module.scss";
import CheckBox from "../checkbox";
import RadioButtons from "../radio";
import Select from "../select";
import { type } from "@testing-library/user-event/dist/type";

interface FormikProps {
  field: {
    name: string;
    value: any;
    onChange: changeHandler<any>;
    onBlur: any;
  };
  form: {
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  };
  inputAdditionalStyles: string;
  errors: any
  type: string;
  placeholder: string;
  value: any;
  options: any;
  onChange: any;
  option: any
  additionalStyles: string;
  label: string;
  handleSelectChange: any;
}

export const FInput = ({ field, form, ...props }: FormikProps) => {
  let inputElement = null;
  let inputClasses = [
    classes.inputElement,
  props.inputAdditionalStyles
  ];

  if (props.errors && props.errors.length) {
    inputClasses = inputClasses.concat(classes.errorField);
  }

  switch (props.type) {
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          value={field.value}
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          placeholder={props.placeholder}
        />
      );
      break;
    case "select":
      inputElement = <Select value={props.value} items={props.options} onChange={props.onChange} />;
      break;
    case "radio":
      inputElement = (
        <RadioButtons inputs={props.options} onCheckChange={props.onChange} />
      );
      break;
    case "checkbox":
      inputElement = (
        <CheckBox input={props.option} onCheckChange={props.onChange} />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={field.value}
          name={field.name}
          onChange={field.onChange}
          placeholder={props.placeholder}
          type={props.type}
          onBlur={field.onBlur}
        />
      );
  }

  return (
    <div className={`${classes.formControl} ${props.additionalStyles}`}>
      {props.label ? (
        <label className="call-to-action left">{props.label}</label>
      ) : null}
      {inputElement}
      {form.touched[field.name] && form.errors[field.name] && (
        <div className={classes.errorMessage}>{form.errors[field.name]}</div>
      )}
    </div>
  );
};

export default FInput;
