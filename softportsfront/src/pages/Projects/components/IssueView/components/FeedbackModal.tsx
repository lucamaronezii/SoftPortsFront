import { IssuesCloseOutlined } from '@ant-design/icons'
import { Flex, Modal } from 'antd'
import React from 'react'
import { IFeedbackModal } from './interfaces'
import TextArea from 'antd/es/input/TextArea'

const feedbackPlaceholderText = 'Digite um feedback para o fechamento do problema. ' +
    'Isso aumenta a transparência e facilita a compreensão do histórico do projeto ' +
    'para todos os membros da equipe e stakeholders.';

const FeedbackModal: React.FC<IFeedbackModal> = ({ open, onConfirm, onCancel }) => {
    return (
        <Modal
            title={<Flex gap={10}><IssuesCloseOutlined />Fechar problema - Feedback</Flex>}
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
