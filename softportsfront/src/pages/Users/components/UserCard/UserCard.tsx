import { DeleteOutlined, SettingFilled } from '@ant-design/icons'
import { Card } from 'antd'
import { ReactNode, useState } from 'react'
import blankuser from '../../../../assets/blank_user.jpg'
import { useAxios } from '../../../../auth/useAxios'
import Popdelete from '../../../../components/Popdelete/Popdelete'
import { IUserCardProps } from '../../interfaces'
import { StyledCard } from './styles'

const UserCard: React.FC<IUserCardProps> = ({ user, onDelete }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const axios = useAxios()

    const deleteUser = async () => {
        setLoading(true)
        await axios.delete(`/usuario/${user.keycloakId}`)
            .then(() => onDelete())
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const actions: ReactNode[] = [
        <SettingFilled key='edit' />,
        <Popdelete
            title='Excluir usuário'
            placement='bottom'
            onConfirm={deleteUser}
            description='Tem certeza que deseja deletar o usuário?'
        >
            <DeleteOutlined key='delete' />
        </Popdelete>
    ]

    return (
        <StyledCard
            actions={actions}
            cover={<img src={blankuser} />}
        >
            <Card.Meta
                title={user.nome}
                // description={user.cargo}
            />
        </StyledCard>
    )
}

export default UserCard
