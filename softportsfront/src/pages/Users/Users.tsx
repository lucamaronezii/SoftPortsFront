import { PlusOutlined } from '@ant-design/icons'
import { Button, Cascader, Flex, Input, Layout } from 'antd'
import { useState } from 'react'
import { CustomRow } from '../../components/CustomRow/styles'
import { positionItems } from '../../utils/roleItems'
import { CustomBox } from '../Projects/styles'
import UserCard from './components/UserCard/UserCard'
import { IUser } from './interfaces'
import NewUser from './NewUser/NewUser'
import { StyledTitle, SubnavPad } from './styles'

const Users: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  
  return (
    <Layout style={{ minHeight: '100vh', gap: 27, paddingLeft: 16 }}>
      <SubnavPad>
        <StyledTitle>Usuários</StyledTitle>
      </SubnavPad>
      <CustomBox mr={20}>
        <CustomRow>
          <Flex gap={15}>
            <div>
              <Input.Search
                placeholder='Pesquisar usuário'
                allowClear
                enterButton
              />
            </div>
            <Cascader
              removeIcon
              placeholder='Filtrar por cargo'
              multiple
              maxTagCount={'responsive'}
              options={positionItems}
            />
          </Flex>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            iconPosition='end'
            onClick={() => setOpenModal(true)}
          >
            Novo usuário
          </Button>
        </CustomRow>

        <Flex gap={16}>
          {users.map((user) => (
            <UserCard user={user} />
          ))}
        </Flex>
      </CustomBox>

      <NewUser open={openModal} onClose={() => setOpenModal(false)} onOk={() => { }} />
    </Layout>
  )
}

export default Users
