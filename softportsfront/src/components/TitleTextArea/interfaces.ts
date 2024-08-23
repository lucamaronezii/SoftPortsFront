import { TextAreaProps } from "antd/es/input";

export interface ITitleTextArea extends TextAreaProps {
    text: string;
    error?: boolean;
}