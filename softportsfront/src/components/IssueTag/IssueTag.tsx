import { Tag } from 'antd'
import React from 'react'
import { IIssueTag } from './interfaces'
import { getPriority, tagColor } from '../../utils/getPriority'

const IssueTag: React.FC<IIssueTag> = ({ priority, children }) => {    
    return (
        <Tag color={tagColor(getPriority(priority)!)}>
            {children}
        </Tag>
    )
}

export default IssueTag
