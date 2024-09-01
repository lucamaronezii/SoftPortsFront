import { CheckOutlined, DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Cascader, Flex, GetProp, Image, Menu, Modal, Spin, Tooltip, Typography, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useAxios } from '../../../../auth/useAxios'
import GapColumn from '../../../../components/Column/Column'
import Popdelete from '../../../../components/Popdelete/Popdelete'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import TitleUpload from '../../../../components/TitleUpload/TitleUpload'
import useProjects from '../../../../hooks/useProjects'
import { getBase64 } from '../../../../utils/getBase64'
import { classList, IOption } from '../../../../utils/getClass'
import { priorityList } from '../../../../utils/getPriority'
import { statusList } from '../../../../utils/getStatus'
import { IssueMenu } from '../../../../utils/menuItems'
import { IUser } from '../../../Users/interfaces'
import { IIssue } from '../../interfaces'
import FeedbackModal from './components/FeedbackModal'
import IssueComments from './components/IssueComments'
import IssueLogs from './components/IssueLogs'
import ModalFooter from './components/ModalFooter'
import { SelectedOptions } from './components/interfaces'
import { IIssueView } from './interfaces'
import { ChildBox, colProps, CustomCol, CustomRow, SpinBox } from './styles'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const IssueView: React.FC<IIssueView> = ({ open, onClose, issueId, issueTitle, projectUsers }) => {
    const [selected, setSelected] = useState<SelectedOptions | any>('details')
    const [issue, setIssue] = useState<IIssue>()
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string | undefined>()
    const [desc, setDesc] = useState<string>()
    const [feedback, setFeedback] = useState<string>()
    const [so, setSo] = useState<string>()
    const [classification, setClassification] = useState<number[]>([])
    const [priority, setPriority] = useState<number>()
    const [status, setStatus] = useState<number>()
    const [road, setRoad] = useState<string>()
    const [issueUsers, setIssueUsers] = useState<IUser[]>()
    const [relatedUsers, setRelatedUsers] = useState<IUser[]>()
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [estimated, setEstimated] = useState<dayjs.Dayjs>()
    const [loadingIssue, setLoadingIssue] = useState<boolean>(true)
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false)
    const [resolved, setResolved] = useState<boolean>(false)
    const { selectedProject } = useProjects()
    const axios = useAxios()

    const handleGetIssue = async () => {
        setLoadingIssue(true)
        await axios.get(`tarefa/${issueId}`)
            .then(res => setIssue(res.data))
            .catch(err => console.error(err))
            .finally(() => setTimeout(() => setLoadingIssue(false), 1000))
    }

    const inputVariant = () => {
        return isEditing ? 'outlined' : 'filled'
    }

    const handleDeleteIssue = async () => {
        await axios.delete(`tarefa/${issueId}`)
            .then(_ => onClose('deleted'))
            .catch(err => console.error(err))
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({ fileList }) => {
        setFileList(fileList)
        console.log(fileList)
        const base64List = await Promise.all(fileList.map(async (file) => {
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

    const handleCloseModal = () => {
        onClose('close');
        setFileList([])
        setIsEditing(false)
    };

    const handleUpdateIssue = async () => {
        setLoading(true)
        if (!issue) return
        const body: any = {
            id: issue.id,
            titulo: title,
            descricao: desc,
            so: so,
            screenshots: fileList.map(image => image.preview?.split(',')[1]),
            caminho: road,
            dataEstimada: estimated!.format(),
            prioridade: priority,
            fechada: issue.fechada,
            posicao: 1,
            status: status,
            projetoId: selectedProject.id,
            usuarioIds: selectedUserIds,
            classificacaoId: classification[0],
            subclassificacaoId: classification[1]
        }
        issue.fechada ?? (body["feedback"] = feedback)
        await axios.put('tarefa', body)
            .then(_ => { onClose('updated'); setIsEditing(false) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const handleIssueClosed = () => {
        setFeedbackOpen(false)
        setTimeout(() => {
            onClose('issueClosed')
        }, 200)
    }

    useEffect(() => {
        handleGetIssue()
        setRelatedUsers(projectUsers)
    }, [open])

    useEffect(() => {
        if (issue) {
            setTitle(issue.titulo)
            setDesc(issue.descricao)
            setSo(issue.so)
            setPriority(issue.prioridade)
            setStatus(issue.status)
            setRoad(issue.caminho)
            setFeedback(issue.feedback)
            setClassification([issue.classificacao!.id, issue.classificacao!.subclassificacaoId])
            setEstimated(dayjs.unix(issue.dataEstimada / 1000))
            setIssueUsers(issue.usuarios)
            const assignedUserIds = issue.usuarios.map(user => user.id);
            setSelectedUserIds(assignedUserIds);

            if (issue.screenshots !== null) {
                const files: UploadFile[] = issue.screenshots!.map((base64, index) => ({
                    uid: `${index}`,
                    name: `screenshot-${index}.png`,
                    status: 'done',
                    url: `data:image/png;base64,${base64}`,
                    preview: `${base64}`
                }));
                setFileList(files);
            }
        }
    }, [issue])

    const handleReopenIssue = async () => {
        setLoading(true)
        setTimeout(async () => {
            await axios.put(`tarefa/fechado/${issue!.id}?fechado=false`)
                .then(_ => onClose('issueReopened'))
                .catch(err => console.error(err))
                .finally(() => setLoading(false))
        }, 1000)
    }

    const handleLeftButtonClick = () => {
        issue?.fechada ? handleReopenIssue() : setFeedbackOpen(true)
    }

    return (
        <Modal
            centered
            closable
            width={1200}
            open={open}
            destroyOnClose
            onCancel={handleCloseModal}
            title={
                <Flex align='center' gap={15}>
                    {issueTitle}
                    <Flex gap={10} align='center'>
                        {selected === 'details' &&
                            <Tooltip placement='top' title={'Editar campos'}>
                                <Button
                                    type={isEditing ? 'primary' : 'dashed'}
                                    onClick={() => setIsEditing(!isEditing)}
                                    icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
                                    size='small'
                                />
                            </Tooltip>
                        }
                        <Popdelete
                            title={'Excluir ocorrência'}
                            description={'Tem certeza que deseja excluir a ocorrência?'}
                            onConfirm={handleDeleteIssue}
                            placement='right'
                        >
                            <Button
                                type='primary'
                                icon={<DeleteOutlined />}
                                size='small'
                                danger
                            />
                        </Popdelete>
                    </Flex>
                </Flex>
            }
            footer={[<ModalFooter
                selected={selected}
                closed={issue?.fechada!}
                onCloseIssue={handleLeftButtonClick}
                onSave={handleUpdateIssue}
                loading={loading}
                setResolved={setResolved}
            />]}
        >
            <Menu
                mode='horizontal'
                items={IssueMenu}
                style={{ marginBottom: '16px' }}
                defaultSelectedKeys={['details']}
                onClick={(event) => setSelected(event.key)}
            />
            {loadingIssue ? (
                <SpinBox>
                    <Spin size='large' />
                </SpinBox>
            ) : selected === 'details' ? (
                <ChildBox>
                    <CustomRow>
                        <CustomCol {...colProps}>
                            <TitleInput
                                text='Título'
                                readOnly={!isEditing}
                                variant={inputVariant()}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <GapColumn>
                                <Typography.Text>Classificação</Typography.Text>
                                <Cascader
                                    options={classList[0].children as IOption[]}
                                    variant={inputVariant()}
                                    value={classification}
                                    onChange={e => setClassification([Number(e[0]), Number(e[1])])}
                                    suffixIcon={!isEditing ? null : <DownOutlined />}
                                    style={!isEditing ? { pointerEvents: "none", width: '100%' } : { width: '100%' }}
                                />
                            </GapColumn>
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleSelect
                                text='Prioridade'
                                value={priority}
                                onChange={(e) => setPriority(e)}
                                options={priorityList[0].children}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                            />
                        </CustomCol>
                    </CustomRow>

                    <CustomRow>
                        <CustomCol {...colProps}>
                            <TitleTextArea
                                text='Descrição'
                                rows={3}
                                readOnly={!isEditing}
                                variant={inputVariant()}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleSelect
                                text='Status'
                                value={status}
                                onChange={(e) => setStatus(e)}
                                fieldNames={{ label: "title", value: "id" }}
                                options={statusList}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleInput
                                text='Caminho entre telas'
                                value={road}
                                readOnly={!isEditing}
                                onChange={(e) => setRoad(e.target.value)}
                                variant={inputVariant()}
                            />
                        </CustomCol>
                    </CustomRow>

                    <CustomRow>
                        <CustomCol {...colProps}>
                            <TitleInput
                                text='Versão do SO'
                                readOnly={!isEditing}
                                variant={inputVariant()}
                                value={so}
                                onChange={(e) => setSo(e.target.value)}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleDatePicker
                                text='Data estimada para correção'
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                                value={estimated}
                                onChange={(e) => setEstimated(e)}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleSelect
                                text='Responsáveis'
                                mode='multiple'
                                value={selectedUserIds}
                                onChange={(e) => setSelectedUserIds(e)}
                                removeIcon={!isEditing}
                                options={relatedUsers}
                                variant={inputVariant()}
                                fieldNames={{ label: "nome", value: "id" }}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                            />
                        </CustomCol>
                    </CustomRow>

                    <CustomRow justify={'start'}>
                        <CustomCol {...colProps}>
                            <TitleUpload
                                text='Screenshots'
                                listType="picture-card"
                                fileList={fileList}
                                disabled={!isEditing}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                multiple
                                beforeUpload={beforeUpload}
                                accept='.jpg, .png, .jpeg'
                                maxCount={3}
                                showUploadList
                                uploadButton={isEditing}
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
                        </CustomCol>
                        {issue?.fechada && (
                            <CustomCol {...colProps}>
                                <TitleTextArea
                                    text='Feedback'
                                    value={feedback}
                                    readOnly={!isEditing}
                                    rows={3}
                                    variant={inputVariant()}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                            </CustomCol>
                        )}
                    </CustomRow>
                </ChildBox>
            ) : selected === 'comments' ? (
                <ChildBox>
                    <IssueComments />
                </ChildBox>
            ) : (
                <ChildBox>
                    <IssueLogs />
                </ChildBox>
            )}
            <FeedbackModal issueId={issueId} open={feedbackOpen} onCancel={() => setFeedbackOpen(false)} onSuccess={handleIssueClosed} />
        </Modal >
    )
}

export default IssueView
