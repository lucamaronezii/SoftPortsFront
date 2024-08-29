import React, { useEffect, useState } from 'react'
import { IIssue } from '../../interfaces'
import { IdIssue, ListText, StyledChild, StyledItem } from '../ListItem/styles'
import { Button, Tooltip } from 'antd'
import { format } from 'date-fns'
import { RollbackOutlined } from '@ant-design/icons'

const ClosedIssue: React.FC<IIssue> = ({ id, titulo, usuarios, descricao, onClick, dataFechamento }) => {
    const [initials, setInitials] = useState<string[]>([])

    const getUsersInitials = () => {
        const newInitials = usuarios.map(user => {
            const text = user.nome[0] + user.nome[1]
            return text.toUpperCase()
        })
        setInitials(newInitials)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return format(date, 'dd/MM/yyyy')
    }

    useEffect(() => {
        getUsersInitials()
    }, [])

    return (
        <StyledItem onClick={onClick}>
            <StyledChild gap={10} width='30%'>
                <IdIssue>[ID-{id}]</IdIssue>
                <ListText title={titulo}>{titulo} - Fechado em: {dataFechamento}</ListText>
            </StyledChild>
            <StyledChild width='60%' justify='center'>
                <ListText title={descricao}>{descricao}</ListText>
            </StyledChild>
            <StyledChild width='10%' justify='end'>
                <Tooltip title={"Reabrir ocorrência"} mouseEnterDelay={0.9}>
                    <Button icon={<RollbackOutlined />} type='primary' />
                </Tooltip>
            </StyledChild>
        </StyledItem>
    )
}

export default ClosedIssue
