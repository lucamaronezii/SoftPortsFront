import { Card } from 'antd'
import profilePhoto from '../../../../assets/luque_linkedin.jpg'
import blankuser from '../../../../assets/blank_user.jpg'
import { StyledCard } from './styles'
import { DeleteOutlined, SettingFilled } from '@ant-design/icons'
import { ReactNode, useRef, useState } from 'react'
import { IUserCard } from './interfaces'

const UserCard: React.FC<IUserCard> = ({ user }) => {

    const actions: ReactNode[] = [
        <SettingFilled key='edit' />,
        <DeleteOutlined key='delete' />
    ]

    return (
        <StyledCard
            actions={actions}
            cover={<img src={blankuser} />}
            onClick={() => { }}
        >
            <Card.Meta
                title={user.nome}
                // description={user.cargo}
            />
        </StyledCard>
    )
}

export default UserCard
