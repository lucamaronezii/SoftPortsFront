import { PlusOutlined } from '@ant-design/icons'
import { Button, Cascader, Flex, Input, Layout, message } from 'antd'
import { useEffect, useState } from 'react'
import { CustomRow } from '../../components/CustomRow/styles'
import { positionItems } from '../../utils/roleItems'
import { CustomBox } from '../Projects/styles'
import UserCard from './components/UserCard/UserCard'
import { IUser } from './interfaces'
import NewUser from './NewUser/NewUser'
import { StyledTitle, SubnavPad } from './styles'
import { useAxios } from '../../auth/useAxios'
import { useDebounce } from 'use-debounce'

const Users: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [input, setInput] = useState<string>('')
  const [debounce] = useDebounce(input, 500)
  const [messageApi, contextHolder] = message.useMessage()
  const axios = useAxios()

  const handleGetUsers = async () => {
    await axios.get(`usuario?nomeUsuario=${input}`).then(res => setUsers([...res.data.conteudo]))
  }

  const onSuccess = () => {
    setOpenModal(false)
    messageApi.success('Usuário cadastrado com sucesso')
    handleGetUsers()
  }

  useEffect(() => {
    handleGetUsers()
  }, [debounce])

  return (
    <>
      {contextHolder}
      <Layout style={{ minHeight: '100vh', gap: 27, paddingLeft: 16 }}>
        <SubnavPad>
          <StyledTitle>Usuários</StyledTitle>
        </SubnavPad>
        <CustomBox mr={20}>
          <CustomRow>
            <Flex gap={15}>
              <Input.Search
                placeholder='Pesquisar usuário'
                onChange={(e) => setInput(e.target.value)}
                allowClear
                enterButton
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

        <NewUser open={openModal} onClose={() => setOpenModal(false)} onSuccess={onSuccess} />
      </Layout>
    </>
  )
}

export default Users
