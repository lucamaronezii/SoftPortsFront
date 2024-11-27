import { Button, Card, Col, Flex, Row, Typography } from 'antd'
import React from 'react'
import { IRequest } from '../interfaces'

const RequestCard: React.FC<{ request: IRequest, onView: () => void }> = ({ request, onView }) => {
    return (
        <Card
            title={request.titulo}
            size='small'
        >
            <Flex vertical gap={12}>
                <Row gutter={[8, 12]}>
                    <Col span={24}>
                        <Typography style={{ fontWeight: 600 }}>Título</Typography>
                        <Typography>{request.titulo}</Typography>
                    </Col>
                    <Col span={24}>
                        <Typography style={{ fontWeight: 600 }}>Descrição</Typography>
                        <Typography.Paragraph
                            style={{ whiteSpace: 'wrap', marginBottom: 0, fontSize: "0.8rem" }}
                            ellipsis={{ rows: 2, expandable: true }}
                        >
                            {request.descricao}
                        </Typography.Paragraph>
                    </Col>
                </Row>
                <Button
                    type='primary'
                    onClick={onView}
                >
                    Visualizar
                </Button>
            </Flex>
        </Card>
    )
}

export default RequestCard
