import { Button, Divider, Flex, Input, Layout, Typography } from 'antd'
import { ImageLogin, LoginBox, LoginCard, ResetPw, Title } from './styles'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import TitleInput from '../../components/TitleInput/TitleInput'

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
              <TitleInput
                text='E-mail'
                placeholder='Digite seu e-mail'
                addonBefore={<UserOutlined />}
              />
              <TitleInput
                text='Senha'
                placeholder='Digite sua senha'
                type='password'
                addonBefore={<KeyOutlined />}
              />
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
