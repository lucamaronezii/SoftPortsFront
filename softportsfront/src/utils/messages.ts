import { MessageInstance } from "antd/es/message/interface";

export const success = (messageApi: MessageInstance, message: string) => {
    messageApi.success({
        content: message,
    });
};