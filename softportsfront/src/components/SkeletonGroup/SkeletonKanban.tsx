import { Skeleton } from 'antd'
import React from 'react'
import { CustomSkeleton } from './styles'

const SkeletonKanban: React.FC<{ total: number }> = ({ total }) => {
    return (
        <>
            {Array.from({ length: total }).map((_, index) => (
                <CustomSkeleton
                    key={index}
                    active
                    style={{ height: "100%", width: '290px' }}
                />
            ))}
        </>
    )
}

export default SkeletonKanban
