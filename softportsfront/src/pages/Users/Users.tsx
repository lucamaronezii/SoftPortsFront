import { StyledTitle, SubnavPad } from './styles'
import { Button, Cascader, Flex, Input, Layout } from 'antd'
import { CustomRow } from '../../components/CustomRow/styles'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { CustomBox } from '../Projects/styles'
import { useState } from 'react'
import UserCard from './components/UserCard/UserCard'
import NewUser from './NewUser/NewUser'

const Users = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <Layout style={{ minHeight: '100vh', gap: 20, paddingLeft: 16 }}>
      <SubnavPad gap={16}>
        <UserOutlined style={{ fontSize: 27 }} />
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
              placeholder='Filtrar usuários'
              multiple
              maxTagCount={'responsive'}
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
          <UserCard />
          <UserCard />
          <UserCard />
        </Flex>
      </CustomBox>

      <NewUser open={openModal} onClose={() => setOpenModal(false)} onOk={() => { }} />
    </Layout>
  )
}

export default Users
