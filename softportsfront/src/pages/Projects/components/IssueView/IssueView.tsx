import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Flex, GetProp, Image, Menu, Modal, Tooltip, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import Popdelete from '../../../../components/Popdelete/Popdelete'
import TitleDatePicker from '../../../../components/TitleDatePicker/TitleDatePicker'
import TitleInput from '../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../../components/TitleTextArea/TitleTextArea'
import TitleUpload from '../../../../components/TitleUpload/TitleUpload'
import { classList } from '../../../../utils/getClass' 
import { statusList } from '../../../../utils/getStatus'
import { usersList } from '../../../../mocks/Users'
import { deleteIssue, editIssue } from '../../../../services/IssueServices'
import { getBase64 } from '../../../../utils/getBase64'
import { IssueMenu } from '../../../../utils/menuItems'
import { priorityList } from '../../../../utils/getPriority'
import FeedbackModal from './components/FeedbackModal'
import IssueComments from './components/IssueComments'
import IssueLogs from './components/IssueLogs'
import ModalFooter from './components/ModalFooter'
import { SelectedOptions } from './components/interfaces'
import { IIssueView } from './interfaces'
import { ChildBox, CustomCol, CustomRow, colProps } from './styles'
import dayjs from 'dayjs'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const IssueView: React.FC<IIssueView> = ({ open, onClose, issue }) => {
    const [selected, setSelected] = useState<SelectedOptions | any>('details')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [so, setSo] = useState<string>('')
    const [classif, setClassif] = useState<number[]>([])
    const [priority, setPriority] = useState<number>()
    const [status, setStatus] = useState<number>()
    const [road, setRoad] = useState<string>('')
    const [correctionDate, setCorrectionDate] = useState<number>()
    const [testCase, setTestCase] = useState<number>();
    const [responsaveis, setResponsaveis] = useState<string[]>([])
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false)
    const [resolved, setResolved] = useState<boolean>(false)

    useEffect(() => {
        if (issue) {
            setTitle(issue.titulo)
            setDesc(issue.descricao)
            setSo(issue.versaoSO || '')
            // setClassif(issue.classificacoes.map((c: IClassification) => c.nome))
            setPriority(issue.prioridade)
            setStatus(issue.status)
            setRoad(issue.caminho || '')
            setCorrectionDate(issue.dataEstimada)
            setResponsaveis(issue.usuarios.map(responsavel => responsavel.nome))
            setResolved(resolved)
        }
    }, [issue, onClose])

    const inputVariant = () => {
        return isEditing ? 'outlined' : 'filled'
    }

    const handleDeleteIssue = async (id: number) => {
        try {
            await deleteIssue(id)
            onClose('deleted')
        } catch (error) {
            console.error(error)
        }
    }

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

    const handleUpdateIssue = async () => {

        const responsiblesIds = responsaveis.map(r => {
            const selectedUser = usersList.find(user => user.value === r);
            return selectedUser ? selectedUser.id : null;
        }).filter(id => id !== null);

        try {
            setLoading(true)
            const body = {
                titulo: title,
                versaoSO: so,
                caminho: road,
                dataEstimada: correctionDate,
                prioridade: priority,
                status: status,
                screenshot: base64Images,
                descricao: desc,
                classificacoes: 1,
                responsaveis: responsiblesIds,
                casoDeTeste: [testCase]
            }
            await editIssue(issue.id, body)
            setLoading(false)
            setIsEditing(false)
            onClose('updated')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseIssue = () => {
        setFeedbackOpen(true)
    }

    const handleCloseModal = () => {
        onClose('close');
        setIsEditing(false)
    };

    if (!issue) return null

    return (
        <Modal
            centered
            closable
            width={1200}
            open={open}
            onCancel={handleCloseModal}
            title={
                <Flex align='center' gap={15}>
                    {issue.titulo}
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
                            onConfirm={() => handleDeleteIssue(issue.id)}
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
                onCloseIssue={handleCloseIssue}
                onSave={handleUpdateIssue}
                selected={selected}
                setResolved={setResolved}
                resolved={resolved}
                loading={loading} />]
            }
        >
            <Menu
                mode='horizontal'
                items={IssueMenu}
                style={{ marginBottom: '16px' }}
                defaultSelectedKeys={['details']}
                onClick={(event) => setSelected(event.key)}
            />
            {selected === 'details' ? (
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
                            <TitleSelect
                                text='Classificação'
                                value={classif}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                                options={classList}
                                onChange={(e) => setClassif(e)}
                                mode='multiple'
                            />
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
                                value={dayjs()}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                            />
                        </CustomCol>
                        <CustomCol {...colProps}>
                            <TitleSelect
                                text='Responsáveis'
                                value={responsaveis}
                                style={!isEditing ? { pointerEvents: "none" } : {}}
                                variant={inputVariant()}
                                removeIcon={!isEditing}
                                options={usersList}
                                mode='multiple'
                                onChange={(value) => setResponsaveis(value)}
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
                    </CustomRow>
                </ChildBox>
            ) : selected === 'comments' ? (
                <ChildBox>
                    <IssueComments issue={issue} />
                </ChildBox>
            ) : (
                <ChildBox>
                    <IssueLogs />
                </ChildBox>
            )
            }

            <FeedbackModal open={feedbackOpen} onConfirm={() => {/*TO DO*/ }} onCancel={() => setFeedbackOpen(false)} />
        </Modal >
    )
}

export default IssueView
