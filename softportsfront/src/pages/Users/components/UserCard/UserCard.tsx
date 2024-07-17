import { Card } from 'antd'
import profilePhoto from '../../../../assets/luque_linkedin.jpg'
import { StyledCard } from './styles'
import { DeleteOutlined, SettingFilled } from '@ant-design/icons'
import { ReactNode, useRef, useState } from 'react'
import { errColor } from '../../../../styles/theme'

const UserCard = () => {

    const actions: ReactNode[] = [
        <SettingFilled key='edit' />,
        <DeleteOutlined key='delete' />
    ]

    return (
        <StyledCard
            actions={actions}
            cover={<img src={profilePhoto} />}
            onClick={() => { }}
        >
            <Card.Meta
                title={'Luca Steyer'}
                description="Desenvolvedor"
            />
        </StyledCard>
    )
}

export default UserCard
