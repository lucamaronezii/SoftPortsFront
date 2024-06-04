import { Col, Row } from 'antd'
import { ColProps } from 'antd/lib'
import styled from 'styled-components'

export const CustomCol = styled(Col)`
    min-width: 100px;
`

export const CustomRow = styled(Row)`
    margin-top: 15px;
    gap: 5px;
`

export const colProps: ColProps = {
    xs: { flex: '100%' },
    sm: { flex: '70%' },
    md: { flex: '50%' },
    lg: { flex: '45%' },
    xl: { flex: '33%' }
}
