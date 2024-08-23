import { InputProps } from "antd";

export interface ITitleInput extends InputProps {
    text: string;
    error?: boolean;
}