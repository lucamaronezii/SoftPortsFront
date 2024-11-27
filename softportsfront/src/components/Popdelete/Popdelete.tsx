import { Popconfirm } from 'antd'
import React from 'react'
import { IPopdelete } from './interfaces'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { errColor } from '../../styles/theme'

const Popdelete: React.FC<IPopdelete> = ({ title, children, description, placement, onConfirm, loadingConfirm, ...popProps }) => {
    return (
        <Popconfirm
            {...popProps}
            title={title}
            description={description}
            okButtonProps={{ danger: true, loading: loadingConfirm }}
            icon={<QuestionCircleOutlined style={{ color: errColor }} />}
            onConfirm={onConfirm}
            placement={placement}
        >
            {children}
        </Popconfirm>
    )
}

export default Popdelete
