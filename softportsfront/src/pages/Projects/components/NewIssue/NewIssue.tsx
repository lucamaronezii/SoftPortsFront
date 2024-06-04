import { Cascader, Flex, Image, Modal, Steps, Typography } from 'antd'
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
import GapColumn from '../../../../components/Column/Column'
import { priorityItems } from '../../../../utils/priorityItems'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const NewIssue: React.FC<INewIssue> = ({ open, onClose, onOk, loading }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const beforeUpload = (file: FileType) => {
        return false;
    };

    return (
        <Modal
            title="Novo registro de problema"
            open={open}
            confirmLoading={loading}
            onOk={onOk}
            onCancel={onClose}
            cancelText={'Cancelar'}
            width={1000}
            centered
        >
            <Flex
                // style={{ backgroundColor: 'red' }}
                gap={10}
                style={{ marginTop: 20 }}
            >
                <Flex
                // style={{ backgroundColor: '#7413FF' }}
                >
                    <Steps
                        direction='vertical'
                        items={stepperItems}
                        style={{ height: 'calc(100% + 100px)' }}
                    />
                </Flex>
                <FieldsBox>
                    <TitleInput text='Título' placeholder='Digite o título do problema' />
                    <TitleTextArea text='Descrição' rows={4} placeholder='Digite a descrição do problema' />
                    <TitleSelect text='Versão do Sistema Operacional' placeholder='Selecione a versão do SO' />
                    <TitleInput text='Caminho entre telas' placeholder='Digite o caminho entre telas' />
                    <TitleDatePicker text='Data estimada para correção' placeholder='Selecione a data estimada para correção' />
                </FieldsBox>
 
                <FieldsBox>
                    <TitleSelect
                        text='Prioridade'
                        placeholder='Selecione a prioridade de correção'
                        options={priorityItems[0].children}
                    />
                    {/* I put the Cascader manually because the component interface is bugged */}
                    <GapColumn>
                        <Typography.Text>Classificação</Typography.Text>
                        <Cascader
                            options={classList}
                            multiple
                            placeholder='Selecione a a classificação do problema'
                            style={{ width: '100%' }}
                        />
                    </GapColumn>
                    <TitleSelect
                        text='Status'
                        placeholder='Selecione o status do problema'
                        options={statusList}
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
                    />
                </FieldsBox>
            </Flex>
        </Modal>
    )
}

export default NewIssue
