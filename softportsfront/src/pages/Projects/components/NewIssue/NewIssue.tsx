import { WarningOutlined } from '@ant-design/icons'
import type { GetProp, UploadProps } from 'antd'
import { Cascader, Flex, Image, Modal, Steps, Typography, message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { UploadFile } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../auth/useAxios'
import GapColumn from '../../../../components/Column/Column'
import { TitleModal } from '../../../../components/CustomRow/styles'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import TitleUpload from '../../../../components/TitleUpload/TitleUpload'
import useProjects from '../../../../hooks/useProjects'
import { usersList } from '../../../../mocks/Users'
import { getBase64 } from '../../../../utils/getBase64'
import { classList, IOption } from '../../../../utils/getClass'
import { priorityList } from '../../../../utils/getPriority'
import { statusList } from '../../../../utils/getStatus'
import { stepperItems } from '../../../../utils/stepperItems'
import { INewIssue } from './interfaces'
import { FieldsBox } from './styles'
import dayjs from 'dayjs'

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const NewIssue: React.FC<INewIssue> = ({ open, onClose, onOk, selectedKanban, projectUsers }) => {
    console.log(selectedKanban)
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [systemVersion, setSystemVersion] = useState<string>()
    const [classification, setClassification] = useState<number[]>([]);
    const [priority, setPriority] = useState<string>()
    const [status, setStatus] = useState<number | undefined>(undefined)
    const [road, setRoad] = useState<string>()
    const [estimated, setEstimated] = useState<dayjs.Dayjs>()
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage();
    const { selectedProject } = useProjects()
    const axios = useAxios()

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
    };

    const beforeUpload = (file: FileType) => {
        return false;
    };

    const handleSuccess = () => {
        onOk('success')
        setTitle('')
        setDescription('')
        setRoad('')
        setSystemVersion('')
        setPriority(undefined)
        setStatus(undefined)
        setEstimated(dayjs())
        setFileList([])
        setSelectedUsers([])
    }

    const handleCreateIssue = async () => {
        setLoading(true)
        const body = {
            titulo: title,
            descricao: description,
            so: systemVersion,
            screenshots: fileList.map(image => image.preview?.split(',')[1]),
            caminho: road,
            dataEstimada: estimated!.format(),
            prioridade: priority,
            posicao: 1,
            status: status,
            projetoId: selectedProject.id,
            usuarioIds: selectedUsers,
            classificacaoId: classification[0],
            subclassificacaoId: classification[1]
        }
        await axios.post('tarefa', body)
            .then(_ => handleSuccess())
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        selectedKanban
            ? setStatus(selectedKanban)
            : setStatus(undefined)
    }, [selectedKanban]);

    return (
        <>
            {contextHolder}
            <Modal
                title={<TitleModal><WarningOutlined /> Novo registro de ocorrência</TitleModal>}
                open={open}
                confirmLoading={loading}
                onOk={handleCreateIssue}
                onCancel={onClose}
                cancelText={'Cancelar'}
                width={1000}
                centered
                destroyOnClose
            >
                <Flex gap={10} style={{ marginTop: 20 }}>
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
                            placeholder='Digite o título da ocorrência'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TitleTextArea
                            text={`Descrição`}
                            rows={4}
                            placeholder='Digite a descrição da ocorrência'
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
                            onChange={(date) => setEstimated(date)}
                        />
                    </FieldsBox>

                    <FieldsBox>
                        <TitleSelect
                            text='Prioridade'
                            placeholder='Selecione a prioridade de correção'
                            options={priorityList[0].children}
                            onChange={(value) => setPriority(value)}
                        />
                        <GapColumn>
                            <Typography.Text>Classificação</Typography.Text>
                            <Cascader
                                placeholder='Selecione a classificação da ocorrência'
                                options={classList[0].children as IOption[]}
                                style={{ width: '100%' }}
                                onChange={e => setClassification([Number(e[0]), Number(e[1])])}
                            />
                        </GapColumn>
                        <TitleSelect
                            text='Status'
                            placeholder='Selecione o status da ocorrência'
                            fieldNames={{ label: "title", value: "id" }}
                            options={statusList}
                            value={status}
                            onChange={(e) => setStatus(e)}
                        />
                        <TitleUpload
                            tooltip={'Limite: 3 arquivos de imagens'}
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
                            options={projectUsers}
                            fieldNames={{ label: "nome", value: "id" }}
                            mode='multiple'
                            onChange={(value) => setSelectedUsers(value)}
                        />
                    </FieldsBox>
                </Flex>
            </Modal>
        </>
    )
}

export default NewIssue
