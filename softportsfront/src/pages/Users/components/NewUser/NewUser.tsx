import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Flex, Image, message, Modal, Typography, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../auth/useAxios'
import { TitleModal } from '../../../../components/CustomRow/styles'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import { getBase64 } from '../../../../utils/getBase64'
import { FileType } from '../../../Projects/components/NewIssue/NewIssue'
import { INewUser } from './interfaces'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import { useKeycloakServer } from '../../../../auth/useKeycloakServer'

const NewUser: React.FC<INewUser> = ({ open, onClose, onSuccess }) => {
    const [name, setName] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [surname, setSurname] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage()
    const axios = useAxios()
    const axiosKc = useKeycloakServer()

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <Flex vertical align='center' gap={10}>
            <PlusOutlined />
            <Typography.Text>Upload</Typography.Text>
        </Flex>
    );

    const beforeUpload = () => {
        return false;
    };

    const handleCreateUser = async () => {
        setLoading(true)
        const body = {
            nome: name,
            email: email,
            username: username
        }
        await axios.post('usuario', body)
            .then(res => onSuccess())
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    
    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.nativeEvent.key == 'Enter' && (handleCreateUser())
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<TitleModal><UserAddOutlined /> Novo usuário</TitleModal>}
                open={open}
                centered
                onCancel={onClose}
                destroyOnClose
                footer={[
                    <Button loading={loading} type='primary' onClick={handleCreateUser}>
                        Salvar
                    </Button>,
                ]}
            >
                <Flex vertical gap={10} style={{ marginBlock: '15px' }}>
                    <Flex justify='center'>
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            accept='.jpg, .png, .jpeg'
                        >
                            {fileList.length == 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Flex>
                    <TitleInput
                        text='Nome'
                        placeholder='Digite o nome do usuário'
                        value={name}
                        onKeyDown={handleKey}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TitleInput
                        text='Sobrenome'
                        placeholder='Digite o sobrenome do usuário'
                        value={surname}
                        onKeyDown={handleKey}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <TitleInput
                        text='Username'
                        placeholder='Digite o username do usuário'
                        value={username}
                        onKeyDown={handleKey}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TitleInput
                        text='E-mail'
                        placeholder='Digite o e-mail de acesso do usuário'
                        value={email}
                        onKeyDown={handleKey}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TitleSelect
                        text='Cargo'
                        allowClear
                        placeholder='Selecione o cargo do usuário'
                    />
                </Flex>
            </Modal>
        </>
    )
}

export default NewUser
