import { changeHandler } from "../../../../ts/types/app-types";
import "./radio.module.scss";

interface IRadioButton {
  inputs?: any[];
  onCheckChange?: changeHandler<HTMLInputElement>;
}

export const RadioButtons: React.FC<IRadioButton> = (props) => {
  return (
    <div>
      {props.inputs &&
        props.inputs.map((input, i) => {
          return (
            <div className="radio-group">
              <input
                checked={input.checked}
                onChange={props.onCheckChange}
                type="radio"
                name={input.name}
                id={i.toString()}
              />
              <span>{input.label}</span>
            </div>
          );
        })}
    </div>
  );
};

export default RadioButtons;
