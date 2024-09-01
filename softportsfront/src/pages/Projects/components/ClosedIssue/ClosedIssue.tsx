import React, { useEffect, useState } from 'react'
import { IIssue } from '../../interfaces'
import { IdIssue, ListText, StyledChild, StyledItem } from '../ListItem/styles'
import { Button, message, Tooltip } from 'antd'
import { format } from 'date-fns'
import { RollbackOutlined } from '@ant-design/icons'
import { useAxios } from '../../../../auth/useAxios'
import { IClosedIssue } from './interfaces'

const ClosedIssue: React.FC<IClosedIssue> = ({ issue, onClick, onReopen }) => {
    const [initials, setInitials] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const axios = useAxios()

    const getUsersInitials = () => {
        const newInitials = issue.usuarios.map(user => {
            const text = user.nome[0] + user.nome[1]
            return text.toUpperCase()
        })
        setInitials(newInitials)
    }

    useEffect(() => {
        getUsersInitials()
    }, [])

    const handleReopenIssue = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setLoading(true)
        setTimeout(async () => {
            await axios.put(`tarefa/fechado/${issue.id}?fechado=false`)
                .then(_ => onReopen!())
                .catch(err => console.error(err))
                .finally(() => setLoading(false))
        }, 1500)
    }

    return (
        <StyledItem onClick={onClick}>
            <StyledChild gap={10} width='30%'>
                <IdIssue>[ID-{issue.id}]</IdIssue>
                <ListText title={issue.titulo}>{issue.titulo} - Fechado em: {issue.dataFechamento}</ListText>
            </StyledChild>
            <StyledChild width='60%' justify='center'>
                <ListText title={issue.descricao}>{issue.descricao}</ListText>
            </StyledChild>
            <StyledChild width='10%' justify='end'>
                <Tooltip title={"Reabrir ocorrência"} mouseEnterDelay={0.9}>
                    <Button
                        icon={<RollbackOutlined />}
                        type='primary'
                        onClick={handleReopenIssue}
                        loading={loading}
                    />
                </Tooltip>
            </StyledChild>
        </StyledItem>
    )
}

export default ClosedIssue
