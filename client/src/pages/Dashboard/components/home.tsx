
import { Badge, Col, Progress, Row, Space, Statistic, Typography } from "antd"
import { useEffect, useState } from "react"
import { useCurrency } from "../../../hooks/currency"
import { useFormat } from "../../../hooks/format"
import { useProfile } from "../../../hooks/perfil"
import { ICoinGecko, IDashboardList } from "../models"
import { BTCInfo, DashboardList, DolarInfo } from "../services/index.service"

export const Home: React.FC<any> = () => {
    // this page will show your wealth stats of your satoshis, average price, how much for 1 btc, how much satoshis
    const { profile } = useProfile()
    const { currency } = useCurrency()
    const { format } = useFormat()

    const [dashboard, setDashboard] = useState<IDashboardList>({} as IDashboardList)
    const [percentage, setPercentage] = useState<number>(0)
    const [marketInfo, setMarketInfo] = useState<ICoinGecko>()
    const [dolar, setDolar] = useState<number>(0)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        DashboardList(profile.id, signal).then((data) => {
            setDashboard(data)
        })

        BTCInfo().then((data) => {
            setMarketInfo(data)
        })

        DolarInfo().then((data) => {
            setDolar(data[0].cotacaoVenda)
        })

        return () => {
            controller.abort()
        }
    }, [profile.id])

    useEffect(() => {

        if (profile.goal < (dashboard.amount || 0)) {
            setPercentage(100)
        } else {            
            setPercentage(Math.trunc( ((dashboard.amount || 0.0) / (profile.goal || 1)) * 100))
        }

    }, [dashboard.amount])


    return (
        <Row>
            <Col offset={1} span={22}>
                <Row>
                    <Col span={24}>
                        <Typography.Title>How much for  {profile.goal}  BTC ?</Typography.Title>
                        <Progress percent={percentage} status={percentage < 100 ? "active" : "success"} />

                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Space direction="vertical" size={"large"}>
                            {format === 'btc' ? (
                                <Statistic title="Bitcoin Amount (BTC)" value={dashboard.amount} precision={8} />
                            ) : (
                                <Statistic title="Bitcoin Amount (SAT)" value={(dashboard.amount || 0) * 100000000} precision={0} />
                            )}

                            {currency === 'usd' ? (
                                <Statistic title="Average Buy Price ($)" prefix="$" value={(dashboard.average_buy || 0) / dolar} precision={2} />
                            ) : (
                                <Statistic title="Average Buy Price (R$)" prefix="R$" value={dashboard.average_buy} precision={2} />
                            )}
                        </Space>

                    </Col>
                    <Col span={8}>
                        <Space direction="vertical" size={"large"}>
                            {!!marketInfo && (
                                <>
                                    <Statistic title="Market Price (24h)" prefix={currency === 'usd' ? ("$") : ('R$')} suffix={
                                        <Badge style={marketInfo.market_data.price_change_percentage_24h < 0 ? { backgroundColor: '#f5222d' } : { backgroundColor: '#52c41a' }} count={`${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(marketInfo.market_data.price_change_percentage_24h)} %`} />
                                    } value={marketInfo.market_data.current_price[currency]} precision={2} />

                                    {currency === 'usd' ? (
                                        <Statistic title="Total Fiat ($)" prefix="$" value={(dashboard.amount || 0) * marketInfo.market_data.current_price[currency]} precision={2} />
                                    ) : (
                                        <Statistic title="Total Fiat (R$)" prefix="R$" value={(dashboard.amount || 0) * marketInfo.market_data.current_price[currency]} precision={2} />
                                    )}
                                </>
                            )}
                        </Space>

                        {/* {currency === 'usd' ? (
                            <Statistic title="Average Sell Price ($)" prefix="$" value={(dashboard.average_sell || 0) / dolar} precision={2} />
                        ) : (
                            <Statistic title="Average Sell Price (R$)" prefix="R$" value={dashboard.average_sell} precision={2} />
                        )} */}

                    </Col>
                    {/* 
                        Add GOAL REACH mode with lottie bitcoin animation
                    */}
                    {/* <Col span={8}>
                        {format === 'btc' ? (
                            <Statistic title="Total Fiat Spent (BTC)" value={dashboard.amount} precision={8} />
                        ) : (
                            <Statistic title="Total Fiat Spent (SAT)" value={(dashboard.amount || 0) * 100000000} precision={0} />
                        )}

                    </Col> */}
                </Row>
            </Col>
        </Row>
    )
}