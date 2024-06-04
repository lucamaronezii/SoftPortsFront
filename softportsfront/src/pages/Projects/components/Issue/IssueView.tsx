import { Button, Flex, Modal } from 'antd'
import React, { useEffect } from 'react'
import { IIssueView } from './interfaces'
import { issuesList } from '../../../../mocks/Issues'

const IssueView: React.FC<IIssueView> = ({ open, onClose, issueId }) => {

    const getIssue = () => {
        const issue = issuesList.find((issue) => issue.id == issueId)
        return issue?.name
    }

    useEffect(() => {
        getIssue()
    }, [])

    return (
        <Modal
            centered
            width={1200}
            open={open}
            title={getIssue()}
            closable
            onCancel={onClose}
            footer={[
                <Button key="submit" type="primary" >
                    Salvar
                </Button>
            ]}
        >
            <Flex>
                Título
            </Flex>
        </Modal>
    )
}

export default IssueView
