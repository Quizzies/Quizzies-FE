import { changeHandler } from "../../../../ts/types/app-types";
import "./radio.module.scss";

interface IRadioButton {
  inputs?: any[];
  onCheckChange?: any;
}

export const RadioButtons: React.FC<IRadioButton> = (props) => {
  return (
    <div>
      {props.inputs &&
        props.inputs.map((input, i) => {
          return (
            <div className="radio-group mt-0.5" key={input.name}>
              <input
                checked={input.checked}
                onChange={() => props.onCheckChange(input.name)}
                type="radio"
                name={input.name}
                id={i.toString()}
              />
              <span>&nbsp;{input.label}</span>
            </div> 
          );
        })}
    </div>
  );
};

export default RadioButtons;
