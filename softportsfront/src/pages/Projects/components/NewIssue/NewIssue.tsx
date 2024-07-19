import { Flex, Form, Image, Modal, Steps, message } from 'antd'
import React, { useState } from 'react'
import { INewIssue } from './interfaces'
import { stepperItems } from '../../../../utils/stepperItems'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import { FieldsBox } from './styles'
import TitleUpload from '../../../../components/TitleUpload/TitleUpload'
import type { GetProp, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib'
import { getBase64 } from '../../../../utils/getBase64'
import { usersList } from '../../../../mocks/Users'
import { statusList } from '../../../../mocks/Status'
import { classList } from '../../../../mocks/Class'
import { priorityItems } from '../../../../utils/priorityItems'
import dayjs from 'dayjs'
import { createIssue } from '../../../../services/IssueServices'
import { NoticeType } from 'antd/es/message/interface'
import { testCasesList } from '../../../../mocks/TestCases'
import { WarningOutlined } from '@ant-design/icons'

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const NewIssue: React.FC<INewIssue> = ({ open, onClose, onOk }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [systemVersion, setSystemVersion] = useState<string>('')
    const [classification, setClassification] = useState<string[]>([]);
    const [priority, setPriority] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [road, setRoad] = useState<string>('')
    const [estimatedCorrectionDate, setEstimatedCorrectionDate] = useState<string>('')
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [responsibles, setResponsibles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [priorityError, setPriorityError] = useState(false);
    const [classificationError, setClassificationError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [testCase, setTestCase] = useState<number | null>(0);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        setFileList(newFileList)
        const base64List = await Promise.all(newFileList.map(async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj as FileType);
            }
            return file.preview as string;
        }));
        setBase64Images(base64List);
        console.log(base64Images)
    };

    const beforeUpload = (file: FileType) => {
        return false;
    };

    const handleMessage = (type: NoticeType, content: string) => {
        messageApi.open({
            type: type,
            content: content,
        });
    };

    const handleCloseModal = () => {
        setTitleError(false);
        setDescriptionError(false);
        setPriorityError(false);
        setClassificationError(false);
        setStatusError(false);
    }

    const handleCreateIssue = async () => {
        setTitleError(false);
        setDescriptionError(false);
        setPriorityError(false);
        setClassificationError(false);
        setStatusError(false);

        let hasError = false;

        if (!title) {
            setTitleError(true);
            hasError = true;
        }

        if (!description) {
            setDescriptionError(true);
            hasError = true;
        }

        if (!priority) {
            setPriorityError(true);
            hasError = true;
        }

        if (classification.length === 0) {
            setClassificationError(true);
            hasError = true;
        }

        if (!status) {
            setStatusError(true);
            hasError = true;
        }

        if (hasError) {
            handleMessage('error', 'Preencha todos os campos obrigatórios antes de prosseguir.')
            return;
        }

        const formattedDate = dayjs(estimatedCorrectionDate).format('YYYY-MM-DD HH:mm:ss');
        if (!formattedDate || formattedDate === 'Invalid Date') {
            message.error('Por favor, selecione uma data válida para correção.');
            return;
        }

        const classificationIds = classification.map(c => {
            const selectedClass = classList.find(cls => cls.value === c);
            return selectedClass ? selectedClass.id : null;
        }).filter(id => id !== null);

        const responsiblesIds = responsibles.map(r => {
            const selectedUser = usersList.find(user => user.value === r);
            return selectedUser ? selectedUser.usuarioId : null;
        }).filter(id => id !== null);

        try {
            setLoading(true)
            const body = {
                titulo: title,
                nome: title,
                versaoSO: systemVersion,
                caminho: road,
                dataCorrecao: formattedDate,
                prioridade: priority,
                status: status,
                screenshots: base64Images[0],
                descricao: description,
                classificacoes: classificationIds,
                responsaveis: responsiblesIds,
                casoDeTeste: [testCase]
            }
            await createIssue(body)
            setLoading(false)
            onOk('success')
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<Flex gap={10}><WarningOutlined /> Novo registro de problema</Flex>}
                open={open}
                confirmLoading={loading}
                onOk={handleCreateIssue}
                onCancel={() => { onClose(); handleCloseModal() }}
                cancelText={'Cancelar'}
                width={1000}
                centered
                destroyOnClose
            >
                <Flex
                    gap={10}
                    style={{ marginTop: 20 }}
                >
                    <Flex>
                        <Steps
                            direction='vertical'
                            items={stepperItems}
                            style={{ height: 'calc(100% + 100px)' }}
                        />
                    </Flex>
                    <FieldsBox>
                        <TitleInput
                            text='Título'
                            placeholder='Digite o título do problema'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            status={titleError ? 'error' : undefined}
                        />
                        <TitleTextArea
                            text={`Descrição`}
                            rows={4}
                            placeholder='Digite a descrição do problema'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            status={descriptionError ? 'error' : undefined}
                        />
                        <TitleInput
                            text='Versão do Sistema Operacional'
                            placeholder='Selecione a versão do SO'
                            value={systemVersion}
                            onChange={(e) => setSystemVersion(e.target.value)}
                        />
                        <TitleInput
                            text='Caminho entre telas'
                            placeholder='Digite o caminho entre telas'
                            onChange={(e) => setRoad(e.target.value)}
                        />
                        <TitleDatePicker
                            text='Data estimada para correção'
                            placeholder='Selecione a data estimada para correção'
                            onChange={(date) => setEstimatedCorrectionDate(date ? date.format() : '')}
                        />
                        <TitleSelect
                            text='Caso de teste'
                            allowClear
                            placeholder='Selecione o caso de teste executado'
                            options={testCasesList}
                            onChange={(e) => setTestCase(e)}
                        />
                    </FieldsBox>

                    <FieldsBox>
                        <TitleSelect
                            text='Prioridade'
                            placeholder='Selecione a prioridade de correção'
                            options={priorityItems[0].children}
                            onChange={(value) => setPriority(value)}
                            status={priorityError ? 'error' : undefined}
                        />
                        <TitleSelect
                            text='Classificação'
                            placeholder='Selecione a classificação do problema'
                            options={classList}
                            mode='multiple'
                            value={classification}
                            onChange={(e) => setClassification(e)}
                            status={classificationError ? 'error' : undefined}
                        />
                        <TitleSelect
                            text='Status'
                            placeholder='Selecione o status do problema'
                            options={statusList}
                            onChange={(e) => setStatus(e)}
                            status={statusError ? 'error' : undefined}
                        />
                        <TitleUpload
                            tooltip={'Máximo: 3 imagens.'}
                            text='Screenshots'
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple
                            beforeUpload={beforeUpload}
                            accept='.jpg, .png, .jpeg'
                            maxCount={3}
                            showUploadList
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
                        <TitleSelect
                            text='Responsáveis'
                            placeholder='Selecione os responsáveis para correção'
                            options={usersList}
                            mode='multiple'
                            onChange={(value) => setResponsibles(value)}
                        />
                        <TitleSelect
                            text='Commit'
                            disabled
                            options={usersList}
                            mode='multiple'
                            onChange={(value) => setResponsibles(value)}
                        />
                    </FieldsBox>
                </Flex>
            </Modal>
        </>
    )
}

export default NewIssue
