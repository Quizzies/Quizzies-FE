import { ReactChild } from 'react';

interface HistoryPushObj {
  pathname: string;
  hash?: string;
  search?: string;
}
export interface PropsChild {
  children: ReactChild;
}

export interface ISelectOptions {
  id: string | number;
  value: string | number;
  selected?: boolean;
}

export interface IRadioButton {
  label: string;
  name: string;
  checked?: boolean;
}
export interface ISwitch {
  label: string;
  checked?: boolean;
}

export interface ModalMenuOptions {
  image: string;
  option: string;
}

export interface AddedStyles {
  additionalStyles?: string;
  id?: string;
}

export interface PassedValues {
  value?: string;
}

export interface History {
  push: (obj: HistoryPushObj) => void;
}

export interface IBaseCard {
  icon: string;
}

export interface IRoundImage {
  id: string;
  imgSrc: string;
  name: string;
}