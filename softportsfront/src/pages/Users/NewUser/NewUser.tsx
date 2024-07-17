import { Button, Flex, Image, Modal, Typography, Upload, UploadProps } from 'antd'
import React, { RefAttributes, useEffect, useRef, useState } from 'react'
import { INewUser } from './interfaces'
import TitleInput from '../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../components/TitleSelect/TitleSelect'
import { UploadFile } from 'antd/lib'
import { FileType } from '../../Projects/components/NewIssue/NewIssue'
import { getBase64 } from '../../../utils/getBase64'
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons'

const NewUser: React.FC<INewUser> = ({ open, onClose, onOk }) => {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

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

    return (
        <Modal
            title={<Flex gap={10}><UserAddOutlined /> Novo usuário</Flex>}
            open={open}
            centered
            onCancel={onClose}
            destroyOnClose
            footer={[
                <Button type='primary' onClick={() => console.log(fileList)}>
                    Salvar
                </Button>,
            ]}
        >
            <Flex vertical gap={10}>
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
                />
                <TitleInput
                    text='E-mail'
                    placeholder='Digite o e-mail de acesso do usuário'
                />
                <TitleInput
                    text='Senha'
                    placeholder='Digite a senha de acesso do usuário'
                />
                <TitleSelect
                    text='Cargo'
                    allowClear
                    placeholder='Selecione o cargo do usuário'
                />
            </Flex>
        </Modal>
    )
}

export default NewUser
