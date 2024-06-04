import { SelectProps } from "antd";

export interface ITitleSelect extends SelectProps {
    text: string;
    removeIcon?: boolean;
}