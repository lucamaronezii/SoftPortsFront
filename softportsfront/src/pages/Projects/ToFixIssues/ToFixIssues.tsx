import { Button, Cascader, Flex, Input, Layout, Segmented } from 'antd'
import { CustomRow } from './styles'
import { cascaderItems } from '../../../utils/cascaderItems'
import { segItems } from '../../../utils/segItems'
import { PlusOutlined } from '@ant-design/icons'

const ToFixIssues = () => {
  return (
    <Layout>
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search allowClear />
          </div>
          <Cascader
            removeIcon
            multiple
            options={cascaderItems}
            maxTagCount={'responsive'}
          />
          <Segmented
            options={segItems}
          />
        </Flex>
        <Button type='primary' icon={<PlusOutlined />} iconPosition='end'>
          Novo problema
        </Button>
      </CustomRow>
    </Layout>
  )
}

export default ToFixIssues
