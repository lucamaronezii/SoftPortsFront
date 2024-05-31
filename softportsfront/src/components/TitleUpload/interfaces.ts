import { UploadProps } from "antd";

export interface ITitleUpload extends UploadProps {
    text: string;
    tooltip?: string;
}