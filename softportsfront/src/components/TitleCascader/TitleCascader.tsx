import React from 'react';
import { ITitleCascader } from './interfaces';
import { Cascader, Typography } from 'antd';
import GapColumn from '../Column/Column';

const TitleCascader: React.FC<ITitleCascader> = ({ text, ...cascaderProps }) => {
    const { Text } = Typography;

    return (
        <GapColumn>
            <Text>{text}</Text>
            <Cascader
                {...cascaderProps}
            />
        </GapColumn>
    );
}

export default TitleCascader;
