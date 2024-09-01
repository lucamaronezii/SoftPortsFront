import { Col, Row } from 'antd'
import { ColProps } from 'antd/lib'
import styled from 'styled-components'

export const CustomCol = styled(Col)`
    min-width: 100px;
`

export const CustomRow = styled(Row)`
    gap: 5px;
    margin-bottom: 10px;
`

export const colProps: ColProps = {
    xs: { flex: '100%' },
    sm: { flex: '70%' },
    md: { flex: '50%' },
    lg: { flex: '45%' },
    xl: { flex: '33%' }
}

export const ChildBox = styled.div`
    height: 408px;
    overflow-y: auto;
`

export const SpinBox = styled(ChildBox)`
    display: flex;
    align-items: center;
    justify-content: center;
`