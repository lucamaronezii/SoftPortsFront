import { Button, Divider, Flex, Input, Layout, Typography } from 'antd'
import { ImageLogin, LoginBox, LoginCard, ResetPw, Title } from './styles'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { Text } = Typography
  return (
    <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <ImageLogin />
      <LoginBox>
        <LoginCard>
          <Flex vertical style={{ alignSelf: 'start' }}>
            <Title>Login</Title>
            <Text>Acesse sua conta Softports</Text>
          </Flex>
          <Flex vertical gap={20} style={{ width: '100%' }}>
            <Flex vertical gap={20}>
              <Flex vertical gap={10}>
                <Text>E-mail</Text>
                <Input placeholder='E-mail' addonAfter={<UserOutlined />} />
              </Flex>
              <Flex vertical gap={10}>
                <Text>Senha</Text>
                <Input.Password placeholder='Senha' addonAfter={<KeyOutlined />} type='password'/>
              </Flex>
            </Flex>
            <Flex align='center' justify='space-between' >
              <Text>
                Esqueceu sua senha? <ResetPw>Redefina-a</ResetPw>
              </Text>
              <Button
                type='primary'
                onClick={() => navigate('/')}
              >
                Entrar
              </Button>
            </Flex>
          </Flex>
        </LoginCard>
      </LoginBox>
    </Layout>
  )
}

export default Login
