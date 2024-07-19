import { Tag } from 'antd'
import { tagColor } from '../../utils/tagColor'
import React from 'react'
import { IIssueTag } from './interfaces'

const IssueTag: React.FC<IIssueTag> = ({ priority, children }) => {
    return (
        <Tag color={tagColor(priority)}>
            {children}
        </Tag>
    )
}

export default IssueTag
