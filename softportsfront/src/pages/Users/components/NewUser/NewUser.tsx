import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Flex, Image, message, Modal, Typography, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib'
import React, { useState } from 'react'
import { useAxios } from '../../../../auth/useAxios'
import { TitleModal } from '../../../../components/CustomRow/styles'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import { getBase64 } from '../../../../utils/getBase64'
import { FileType } from '../../../Projects/components/NewIssue/NewIssue'
import { INewUser } from './interfaces'
import { IRole, rolesList } from '../../../../mocks/Roles'

const NewUser: React.FC<INewUser> = ({ open, onClose, onSuccess }) => {
    const [name, setName] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [surname, setSurname] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [role, setRole] = useState<IRole>()
    const [messageApi, contextHolder] = message.useMessage()
    const axios = useAxios()

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList }) => {
        const updatedFileList = await Promise.all(fileList.map(async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj as FileType);
            }

            return file;
        }));

        setFileList(updatedFileList)
    };

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
            sobrenome: surname,
            email: email,
            emailVerified: "true",
            username: username,
            realmRoles: [role],
            foto: fileList.length > 0 ? fileList[0].preview?.split('base64,')[1] : null,
            attributes: {
                organizationId: 1
            }
        }

        await axios.post('usuario', body)
            .then(_ => onSuccess())
            .catch(_ => {
                messageApi.error('Erro inesperado. Tente novamente mais tarde.');
                setLoading(false)
            })
            .finally(() => setLoading(false))
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.nativeEvent.key == 'Enter' && (handleCreateUser())
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title={<TitleModal><UserAddOutlined /> Novo usuário</TitleModal>}
                onCancel={onClose}
                confirmLoading={loading}
                onOk={handleCreateUser}
                okText="Salvar"
                destroyOnClose
                centered
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
                        onChange={(_, role) => setRole(role as IRole)}
                        fieldNames={{ label: 'name', value: 'id' }}
                        options={rolesList}
                        placeholder='Selecione o cargo do usuário'
                    />
                </Flex>
            </Modal>
        </>
    )
}

export default NewUser
