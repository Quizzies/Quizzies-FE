import { FC, useState, RefObject, useRef, useEffect } from "react";

import { IntersectPropsSelect } from "../../../../ts/types/select-types";
import { ISelectOptions } from "../../../../ts/interfaces/app-interfaces";

const Dropdown: FC<IntersectPropsSelect> = (props) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<ISelectOptions[]>([]);
  const toggle = () => setOpen(!open);
  const container: RefObject<any> = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOnClick(item: ISelectOptions) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!props.multiSelect) {
        setSelection([item]);
        props.onChange!({ target: { value: item.id } } as any);
      }
    } else if (props.multiSelect) {
      setSelection([...selection, item]);
    } else {
      const selectionRemaining = selection.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionRemaining]);
    }
    toggle();
  }

  function handleClickOutside(event: any) {
    if (!container.current.contains(event.target)) {
      setOpen(false);
    }
  }

  const dropdownTitleContainer = ["select-selected"];
  if (open) {
    dropdownTitleContainer.push("select-arrow-active");
  }

  return (
    <>
      {props.label ? (
        <label className="call-to-action left">{props.label}</label>
      ) : null}
      <div className="custom-select" ref={container} onClick={() => toggle()}>
        <div className={dropdownTitleContainer.join(" ")}>
          <p>{selection.length > 0 ? selection[0].value : props.value}</p>
        </div>
        <div>
          {props.tags &&
            props.tags.map((tag: ISelectOptions) => {
              return <p key={tag.id}>{tag.value}</p>;
            })}
        </div>
        {open && (
          <div className="select-items">
            {props.items.map((item: ISelectOptions) => (
              <div key={item.id} onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
