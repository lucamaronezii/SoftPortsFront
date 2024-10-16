import { Col, Row } from 'antd'
import React from 'react'
import { CustomBox } from '../styles'

const Requests = () => {
  return (
    <CustomBox>
      <Row style={{ backgroundColor: 'red' }}>
        <Col span={12}>
          a
        </Col>
        <Col span={12}>
          a
        </Col>
      </Row>
    </CustomBox>
  )
}

export default Requests
