import { IntersectBaseProps } from "../../../ts/types/image-types";

const Image: React.FC<IntersectBaseProps> = (props) => {
  // const router = useRouter();

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    // router.push(props.goToOnClick!);
  }

  const imgStyles = props.additionalStyles
    ? [props.style, props.additionalStyles].join(" ")
    : props.style;

  return (
    <img
      style={props.goToOnClick ? { cursor: "pointer" } : {}}
      className={imgStyles}
      src={props.src}
      alt={props.alt}
      height={props.size}
      width={props.size}
      onClick={props.goToOnClick ? (e) => handleClick(e) : () => {}}
    />
  );
};

export default Image;
