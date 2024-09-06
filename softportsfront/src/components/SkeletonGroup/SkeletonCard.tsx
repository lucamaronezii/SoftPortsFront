import { Skeleton } from 'antd'
import React from 'react'

const SkeletonCard: React.FC<{ total: number }> = ({ total }) => {
    return (
        <>
            {Array.from({ length: total }).map((_, index) => (
                <Skeleton.Input
                    key={index}
                    active
                    style={{ height: "250px", width: '160px' }}
                />
            ))}
        </>
    )
}

export default SkeletonCard
