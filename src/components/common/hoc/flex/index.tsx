import React from "react";
import { PropsChild } from "../../../../ts/interfaces/app-interfaces";

export const Flex: React.FC<PropsChild> = ({ children }) => {
  return <div className="flex-items inner-space">{children}</div>;
};

export default Flex;
