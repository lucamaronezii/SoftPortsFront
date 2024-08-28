import { GetProp, Image, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import TitleDatePicker from '../../../../../components/TitleDatePicker/TitleDatePicker'
import TitleInput from '../../../../../components/TitleInput/TitleInput'
import TitleSelect from '../../../../../components/TitleSelect/TitleSelect'
import TitleTextArea from '../../../../../components/TitleTextArea/TitleTextArea'
import TitleUpload from '../../../../../components/TitleUpload/TitleUpload'
import { statusList } from '../../../../../mocks/Status'
import { testCasesList } from '../../../../../mocks/TestCases'
import { usersList } from '../../../../../mocks/Users'
import { getBase64 } from '../../../../../utils/getBase64'
import { priorityItems } from '../../../../../utils/getPriority'
import { colProps, CustomCol, CustomRow } from '../styles'
import { IIssueDetails } from './interfaces'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const IssueDetails: React.FC<IIssueDetails> = ({ issue, onClose, isEditing, setIsEditing, onUpdate }) => {
    const [view, setView] = useState<string>('detail')
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [so, setSo] = useState<string>('')
    const [classif, setClassif] = useState<string[]>([])
    const [priority, setPriority] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [road, setRoad] = useState<string>('')
    const [correctionDate, setCorrectionDate] = useState<dayjs.Dayjs | null>(null)
    const [testCase, setTestCase] = useState<number>();
    const [responsaveis, setResponsaveis] = useState<string[]>([])
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>()

    const inputVariant = () => {
        return isEditing ? 'outlined' : 'filled'
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
        console.log(base64Images)
    };

    const beforeUpload = (file: FileType) => {
        return false;
    };

    const handleSave = () => {
        const formattedDate = correctionDate ? correctionDate.format('YYYY-MM-DD HH:mm:ss') : '';

        const responsiblesIds = responsaveis.map(r => {
            const selectedUser = usersList.find(user => user.value === r);
            return selectedUser ? selectedUser.id : null;
        }).filter(id => id !== null);

        const updatedIssue = {
            titulo: title,
            versaoSO: so,
            caminho: road,
            dataCorrecao: formattedDate,
            prioridade: priority,
            status: status,
            screenshot: base64Images,
            descricao: desc,
            classificacoes: 1,
            responsaveis: responsiblesIds,
            casoDeTeste: [testCase]
        };

        onUpdate(updatedIssue);
    }

    return (
        <>
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
                        onChange={(e) => setClassif(e)}
                        mode='multiple'
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleSelect
                        text='Prioridade'
                        value={priority}
                        onChange={(e) => setPriority(e)}
                        options={priorityItems[0].children}
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
                        value={correctionDate}
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        variant={inputVariant()}
                        removeIcon={!isEditing}
                        onChange={(date) => setCorrectionDate(date)}
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
                    <TitleSelect
                        text='Caso de teste'
                        style={!isEditing ? { pointerEvents: "none" } : {}}
                        removeIcon={!isEditing}
                        variant={inputVariant()}
                        value={testCase}
                        options={testCasesList}
                        onChange={(e) => setTestCase(e)}
                    />
                </CustomCol>
                <CustomCol {...colProps}>
                    <TitleUpload
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
        </>
    )
}

export default IssueDetails
