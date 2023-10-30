import { changeHandler } from "../../../../ts/types/app-types";
import classes from "./checkbox.module.scss";

interface ICheckBox {
  input?: any;
  onCheckChange?: changeHandler<HTMLInputElement>;
  label: string
}

export const CheckBox: React.FC<ICheckBox> = (props: ICheckBox) => {
  return (
    <>
      <label id={classes.checkBox}>
        <input
          type="checkbox"
          onChange={props.onCheckChange}
          defaultChecked={props.input.checked}
        />
        <span className={classes.checkmark}></span>
      </label>
      <label style={{ fontSize: 14 }}>{props.label}</label>
      <br></br>
    </>
  );
};

export default CheckBox;
