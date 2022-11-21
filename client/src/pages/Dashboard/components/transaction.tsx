import { Col, Row, Table, Tag, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useCurrency } from "../../../hooks/currency";
import { useFormat } from "../../../hooks/format";
import { useProfile } from "../../../hooks/perfil"
import { ITransaction } from "../models";
import { DolarInfo, TransactionList } from "../services/index.service";

export const Transaction: React.FC<any> = () => {
    const { profile } = useProfile()
    const { format } = useFormat()
    const { currency } = useCurrency()

    const [transactions, setTransactions] = useState<ITransaction[]>()
    const [columns, setColumns] = useState<ColumnsType<ITransaction>>([])
    const [dolar, setDolar] = useState<number>(0)

    useEffect(() => {
        DolarInfo().then((data) => {
            setDolar(data[0].cotacaoVenda)
        })
    }, [])

    useEffect(() => {
        setColumns([
            {
                title: 'OP',
                dataIndex: 'side',
                key: 'side',
                render: (text: number) => (
                    <span>
                        {text === 1 ? (
                            <Tag color={'green'} key={text}>
                                BUY
                            </Tag>
                        ) : (
                            <Tag color={'volcano'} key={text}>
                                SELL
                            </Tag>
                        )}
                    </span>
                ),

            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                render: (text: number) => (
                    <span>
                        {format === 'btc' ? (
                            new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format((text))
                        ) : (
                            new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format((text * 100000000))

                        )}
                    </span>
                ),


            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                render: (text: number) => (
                    <span>
                        {currency === 'usd' ? (
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((text / dolar))
                        ) : (
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(text)
                        )}
                    </span>
                ),
            },
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total',
                render: (text: number) => (
                    <span>
                        {currency === 'usd' ? (
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((text / dolar))
                        ) : (
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(text)
                        )}
                    </span>
                ),
            },
            {
                title: 'Date',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (text: string) => (
                    <span>
                        {new Intl.DateTimeFormat('pt-BR').format(Date.parse(text))}
                    </span>
                ),
            },
        ])
    }, [format, currency, dolar])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        TransactionList(profile.id, signal).then(data => setTransactions(data))

        return () => {
            controller.abort()
        }
    }, [profile.id])

    return (
        <Row>
            <Col offset={1} span={22}>
                <Row>
                    <Col span={24}>
                        <Typography.Title>All your <i> {profile.name} </i> transactions </Typography.Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table dataSource={transactions} columns={columns} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}