import { changeHandler } from "../../../../ts/types/app-types";
import "./checkbox.module.scss";

interface ISwitch {
  input?: any;
  onCheckChange?: changeHandler<HTMLInputElement>;
}

export const CheckBox: React.FC<ISwitch> = (props: ISwitch) => {
  return (
    <label id="checkBox">
      <input
        type="checkbox"
        onChange={props.onCheckChange}
        defaultChecked={props.input.checked}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
