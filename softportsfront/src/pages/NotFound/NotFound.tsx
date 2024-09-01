import { Flex } from 'antd'
import notfoundSvg from '../../assets/404.svg'
import { StyledLayout } from '../Backroom/styles'
import { CustomBackBox, CustomBackButton, CustomWarnText } from './styles'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <StyledLayout>
      <Flex vertical>
        <img src={notfoundSvg} width={500} />
        <CustomBackBox>
          <CustomWarnText>Ops! A página buscada não foi encontrada.</CustomWarnText>
          <CustomBackButton
            type='primary'
            onClick={() => navigate('/')}
          >Voltar</CustomBackButton>
        </CustomBackBox>
      </Flex>
    </StyledLayout>
  )
}

export default NotFound
