import { Button, Flex, Form, Image, Input, Modal, UploadProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UploadFile } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { useAxios } from '../../../../auth/useAxios';
import TitleUpload from '../../../../components/TitleUpload/TitleUpload';
import useProjects from '../../../../hooks/useProjects';
import { getBase64 } from '../../../../utils/getBase64';
import { IRequest } from '../../Requests/interfaces';
import { FileType } from '../NewIssue/NewIssue';
import Popdelete from '../../../../components/Popdelete/Popdelete';

interface IRequestForm {
    open: boolean;
    onClose: () => void;
    selectedRequest?: number;
    onCreated?: () => void;
    onSuccessAccept?: () => void;
    onSuccessReject?: () => void;
}

const RequestForm: React.FC<IRequestForm> = ({ open, selectedRequest, onClose, onSuccessAccept, onSuccessReject, onCreated }) => {
    const [form] = useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingRequest, setLoadingRequest] = useState<boolean>(true)
    const [loadingCreation, setLoadingCreation] = useState<boolean>(true)
    const [loadingReject, setLoadingReject] = useState<boolean>(false)
    const [request, setRequest] = useState<IRequest>()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [fileView, setFileView] = useState<UploadFile[]>([])
    const { selectedProject } = useProjects()
    const axios = useAxios()

    const handleNewRequest = () => {
        form.validateFields().then(_ => createRequest())
    }

    const handleAccept = async () => {
        setLoading(true)
        await axios.put(`solicitacao/aprovar/${selectedRequest}`)
            .then(() => onSuccessAccept!())
            .finally(() => setLoading(false))
    }

    const handleReject = async () => {
        setLoadingReject(true)
        await axios.delete(`solicitacao/${selectedRequest}`)
            .then(() => onSuccessReject!())
            .finally(() => setLoadingReject(false))
    }

    const getRequest = async () => {
        setLoadingRequest(true)
        setTimeout(async () => {
            await axios.get(`/solicitacao/${selectedRequest}`)
                .then(res => {
                    setRequest(res.data);
                    form.setFieldsValue(res.data);

                    if (res.data.screenshots !== null) {
                        const files: UploadFile[] = res.data.screenshots!.map((base64: any, index: any) => ({
                            uid: `${index}`,
                            name: `screenshot-${index}.png`,
                            status: 'done',
                            url: `data:image/png;base64,${base64}`,
                            preview: `${base64}`
                        }));
                        setFileList(files);
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setLoadingRequest(false))
        }, 1000)
    }

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

    const beforeUpload = () => {
        return false;
    };

    const createRequest = async () => {
        setLoadingCreation(true)
        const body = {
            titulo: form.getFieldValue('titulo'),
            descricao: form.getFieldValue('descricao'),
            so: form.getFieldValue('so'),
            caminho: form.getFieldValue('caminho'),
            status: 1,
            projetoId: selectedProject.id,
            screenshots: fileList && fileList.map(image => image.preview?.split(',')[1]),
        }
        await axios.post('/solicitacao', body)
            .then(onCreated)
            .catch(err => console.log(err))
            .finally(() => setLoadingCreation(false))
    }

    useEffect(() => {
        getRequest()
    }, [selectedRequest])

    return (
        <Modal
            open={open}
            onOk={handleNewRequest}
            onCancel={onClose}
            destroyOnClose
            centered
            loading={loadingRequest}
            title={selectedRequest ? "Gerenciar solicitação" : "Nova ocorrência"}
            footer={!selectedRequest ? [
                <Flex gap={8} justify='end'>
                    <Button
                        onClick={onClose}
                    >Cancelar</Button>
                    <Button onClick={handleNewRequest} type='primary'>
                        Solicitar
                    </Button>
                </Flex>
            ] : [
                <Flex gap={8} justify='end'>
                    <Popdelete
                        title="Recusar solicitação"
                        description="Tem certeza que deseja recusar a solicitação?"
                        onConfirm={handleReject}
                        loadingConfirm={loadingReject}
                    >
                        <Button type='primary' danger>
                            Recusar solicitação
                        </Button>
                    </Popdelete>
                    <Button loading={loading} onClick={handleAccept}>
                        Aceitar solicitação
                    </Button>
                </Flex>
            ]}
        >
            <Form layout='vertical' form={form} style={{ marginTop: 20 }}>
                <Form.Item
                    label="Título"
                    name="titulo"
                    initialValue={request && request.titulo}
                >
                    <Input
                        placeholder='Digite o título da ocorrência'
                        readOnly={!!selectedRequest}
                        variant={selectedRequest ? 'filled' : 'outlined'}
                    />
                </Form.Item>
                <Form.Item
                    label="Descrição"
                    name='descricao'
                    initialValue={request && request.descricao}
                >
                    <Input
                        placeholder='Digite a descrição da ocorrência'
                        readOnly={!!selectedRequest}
                        variant={selectedRequest ? 'filled' : 'outlined'}
                    />
                </Form.Item>
                <Form.Item
                    label="Versão do Sistema Operacional"
                    name='so'
                    initialValue={request && request.so}
                >
                    <Input
                        placeholder='Digite o SO da ocorrência'
                        readOnly={!!selectedRequest}
                        variant={selectedRequest ? 'filled' : 'outlined'}
                    />
                </Form.Item>
                <Form.Item
                    label="Caminho entre telas"
                    name='caminho'
                    initialValue={request && request.caminho}
                >
                    <Input
                        placeholder='Digite o caminho entre telas da ocorrência'
                        readOnly={!!selectedRequest}
                        variant={selectedRequest ? 'filled' : 'outlined'}
                    />
                </Form.Item>
                <Form.Item valuePropName="fileList">
                    <TitleUpload
                        tooltip={selectedRequest ? undefined : 'Limite: 3 arquivos de imagens'}
                        text='Screenshots'
                        listType="picture-card"
                        fileList={fileView.length > 0 ? fileView : fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        multiple
                        beforeUpload={beforeUpload}
                        accept='.jpg, .png, .jpeg'
                        maxCount={3}
                        showUploadList
                        disabled={!!selectedRequest}
                    />
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
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RequestForm
