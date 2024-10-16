import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useAxios } from '../../auth/useAxios'
import { CustomGrow, CustomRow } from '../../components/CustomRow/styles'
import SkeletonCard from '../../components/SkeletonGroup/SkeletonCard'
import { CustomBox } from '../Projects/styles'
import NewUser from './components/NewUser/NewUser'
import UserCard from './components/UserCard/UserCard'
import { IUser } from './interfaces'
import { CustomSubgrow, StyledLayout, StyledTitle, StyledUsersBox, SubnavPad } from './styles'

const Users = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [input, setInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [debounce] = useDebounce(input, 500)
  const [messageApi, contextHolder] = message.useMessage()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>()

  const axios = useAxios()

  const handleGetUsers = async () => {
    setLoading(true)
      await axios.get(`usuario?nomeUsuario=${input}&tamanhoPagina=${pageSize}&numeroPagina=${page}`)
        .then(res => {
          setUsers([...res.data.conteudo])
          setTotal(res.data.totalRegistros)
          setPageSize(pageSize)
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
  }

  const onSuccess = () => {
    setOpenModal(false)
    messageApi.success('Usuário cadastrado com sucesso')
    handleGetUsers()
  }

  const onDeleteSuccess = () => {
    messageApi.success('Usuário excluído com sucesso.')
    handleGetUsers()
  }

  useEffect(() => {
    handleGetUsers()
  }, [debounce, page, pageSize])

  return (
    <>
      {contextHolder}
      <StyledLayout>
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

          <CustomGrow>
            <CustomSubgrow>
              <StyledUsersBox>
                {loading ? (
                  <SkeletonCard total={4} />
                ) : (
                  users.map((user) => (
                    <UserCard user={user} onDelete={onDeleteSuccess} />
                  ))
                )}
              </StyledUsersBox>
            </CustomSubgrow>
            <Flex justify='end'>
              <Pagination
                current={page}
                onChange={(page, pageSize) => { setPage(page); setPageSize(pageSize) }}
                pageSize={pageSize}
                showSizeChanger
                total={total}
              />
            </Flex>
          </CustomGrow>
        </CustomBox>

        <NewUser open={openModal} onClose={() => setOpenModal(false)} onSuccess={onSuccess} />
      </StyledLayout>
    </>
  )
}

export default Users
