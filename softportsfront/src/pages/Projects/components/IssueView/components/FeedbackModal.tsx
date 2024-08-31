import { IssuesCloseOutlined } from '@ant-design/icons'
import { Flex, message, Modal } from 'antd'
import React, { useState } from 'react'
import { IFeedbackModal } from './interfaces'
import TextArea from 'antd/es/input/TextArea'
import { TitleModal } from '../../../../../components/CustomRow/styles'
import { useAxios } from '../../../../../auth/useAxios'

const feedbackPlaceholderText = 'Digite um feedback para o fechamento da ocorrência. ' +
    'Isso aumenta a transparência e facilita a compreensão do histórico do projeto ' +
    'para todos os membros da equipe e stakeholders.';

const FeedbackModal: React.FC<IFeedbackModal> = ({ open, issueId, onCancel, onSuccess }) => {
    const [feedback, setFeedback] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const axios = useAxios()

    const handleInput = () => {
        if (!feedback?.length) {
            messageApi.error('Digite um feedback para prosseguir.'); return false
        } else return true
    }

    const handlePutFeedback = async () => {
        if (!handleInput()) return
        setLoading(true)
        await axios.put(`tarefa/feedback/${issueId}?feedback=${feedback}`)
            .then(handleCloseIssue)
            .catch(err => console.error(err))
    }

    const handleCloseIssue = async () => {
        await axios.put(`tarefa/fechado/${issueId}?fechado=true`)
            .then(_ => onSuccess())
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={<TitleModal><IssuesCloseOutlined />Fechar ocorrência - Feedback</TitleModal>}
                closable
                open={open}
                confirmLoading={loading}
                onCancel={onCancel}
                onOk={handlePutFeedback}
            >
                <TextArea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={feedbackPlaceholderText}
                    rows={6}
                    style={{ marginBlock: '10px' }}
                />
            </Modal>
        </>
    )
}

export default FeedbackModal
