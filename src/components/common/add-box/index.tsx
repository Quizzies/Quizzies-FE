import React from 'react';
import classes from "./add-box.module.scss";

type Props = {
  addAnswer: any
}

export const AddChoiceBox: React.FC<Props> = ({addAnswer}) => {
  const inputRef = React.createRef<HTMLInputElement>();
  return (
    <div className={`${classes.formControl}`}>
      <input ref={inputRef} type="text" className={classes.inputElement} />
      <span className={classes.plus} onClick={() => {
        if (inputRef.current!.value) {
          addAnswer(inputRef.current?.value)
        }
        inputRef.current && (inputRef.current!.value = '');
      }}>&#43;</span>
    </div>
  );
};

export default AddChoiceBox;
