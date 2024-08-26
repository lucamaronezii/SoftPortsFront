import { IssuesCloseOutlined } from '@ant-design/icons'
import { Flex, Modal } from 'antd'
import React from 'react'
import { IFeedbackModal } from './interfaces'
import TextArea from 'antd/es/input/TextArea'
import { TitleModal } from '../../../../../components/CustomRow/styles'

const feedbackPlaceholderText = 'Digite um feedback para o fechamento da ocorrência. ' +
    'Isso aumenta a transparência e facilita a compreensão do histórico do projeto ' +
    'para todos os membros da equipe e stakeholders.';

const FeedbackModal: React.FC<IFeedbackModal> = ({ open, onConfirm, onCancel }) => {
    return (
        <Modal
            title={<TitleModal><IssuesCloseOutlined />Fechar ocorrência - Feedback</TitleModal>}
            open={open}
            closable
            onCancel={onCancel}
            onOk={onConfirm}
        >
            <TextArea
                placeholder={feedbackPlaceholderText}
                rows={6}
                style={{ marginBlock: '10px' }}
            />
        </Modal>
    )
}

export default FeedbackModal
