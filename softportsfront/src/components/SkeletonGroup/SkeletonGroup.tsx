import { Skeleton } from 'antd'
import React from 'react'

const SkeletonGroup: React.FC<{ total: number }> = ({ total }) => {
    return (
        <>
            {Array.from({ length: total }).map((_, index) => (
                <Skeleton.Input key={index} active style={{ width: "100%" }} />
            ))}
        </>
    )
}

export default SkeletonGroup
