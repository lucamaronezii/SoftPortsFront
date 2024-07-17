import Typography from 'antd/lib/typography/Typography'
import { StyledTitle, SubnavPad } from './styles'
import { Button, Flex, Layout } from 'antd'

const Users = () => {
  return (
    <Layout style={{ minHeight: '100vh', gap: 20, paddingLeft: 16 }}>
      <SubnavPad>
        <StyledTitle>Usuários</StyledTitle>
      </SubnavPad>
      <Flex style={{ paddingLeft: 20 }}>
        <Button>Teste</Button>
      </Flex>
    </Layout>
  )
}

export default Users
