import { Button, Cascader, Flex, Input, Layout, Segmented, Typography } from 'antd'
import { CustomBox } from './styles'
import { cascaderItems } from '../../../utils/cascaderItems'
import { segItems } from '../../../utils/segItems'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { issuesList } from '../../../mocks/Issues'
import { CustomRow } from '../../../components/CustomRow/styles'
import ListItem from '../components/ListItem/ListItem'

const ToFixIssues = () => {
  const [issues, setIssues] = useState(issuesList)
  const [input, setInput] = useState<string>('')

  const addIssue = () => {
    const newIssue = {
      id: issues.length + 1,
      label: input
    }
    setIssues([...issues, newIssue])
    console.log(issues)
  }

  return (
    <CustomBox>
      <CustomRow>
        <Flex gap={15}>
          <div style={{ maxWidth: '300px' }}>
            <Input.Search
              value={input}
              allowClear
              onChange={(e) => setInput(e.target.value)}
            />
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
        <Button type='primary' icon={<PlusOutlined />} iconPosition='end' onClick={addIssue}>
          Novo problema
        </Button>
      </CustomRow>

      <Flex vertical gap={10}>
        {issues.map((issue, index) => (
          <ListItem
            name={issue.label}
          />
        ))}
      </Flex>
    </CustomBox>
  )
}

export default ToFixIssues
