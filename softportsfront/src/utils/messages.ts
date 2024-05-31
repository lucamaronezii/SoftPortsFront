export const success = (messageApi: any) => {
    messageApi.open({
        type: 'success',
        content: 'This is a success message',
    });
};