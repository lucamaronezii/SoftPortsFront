import { Flex, Image, Modal, Steps, message } from 'antd'
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

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

    const handleCreateIssue = async () => {
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
                screenshot: base64Images,
                descricao: description,
                classificacoes: classificationIds,
                responsaveis: responsiblesIds,
                casoDeTeste: [1]
            }
            const response = await createIssue(body)
            setLoading(false)
            onClose()
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Novo registro de problema"
            open={open}
            confirmLoading={loading}
            onOk={handleCreateIssue}
            onCancel={onClose}
            cancelText={'Cancelar'}
            width={1000}
            centered
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
                    />
                    <TitleTextArea
                        text='Descrição'
                        rows={4}
                        placeholder='Digite a descrição do problema'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                </FieldsBox>

                <FieldsBox>
                    <TitleSelect
                        text='Prioridade'
                        placeholder='Selecione a prioridade de correção'
                        options={priorityItems[0].children}
                        onChange={(value) => setPriority(value)}
                    />
                    <TitleSelect
                        text='Classificação'
                        placeholder='Selecione a classificação do problema'
                        options={classList}
                        mode='multiple'
                        value={classification}
                        onChange={(e) => setClassification(e)}
                    />
                    <TitleSelect
                        text='Status'
                        placeholder='Selecione o status do problema'
                        options={statusList}
                        onChange={(e) => setStatus(e)}
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
                </FieldsBox>
            </Flex>
        </Modal>
    )
}

export default NewIssue
