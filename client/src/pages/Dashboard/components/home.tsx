import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { Col, Progress, Row, Statistic, Typography } from "antd"
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
        DashboardList(profile.id).then((data) => {
            setDashboard(data)
        })

        BTCInfo().then((data) => {
            setMarketInfo(data)
        })

        DolarInfo().then((data) => {
            setDolar(data[0].cotacaoVenda)
        })
    }, [profile])

    useEffect(() => {
        console.log(Math.trunc((profile.goal || 1) / (dashboard.amount || 0.0) / 10));

        if (profile.goal < (dashboard.amount || 0)) {
            setPercentage(100)
        } else {
            setPercentage(Math.trunc(((profile.goal || 1) / (dashboard.amount || 0.0)) / 10))
        }

    }, [dashboard])


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
                    <Col span={12}>
                        {format === 'btc' ? (
                            <Statistic title="Bitcoin Amount (BTC)" value={dashboard.amount} precision={8} />
                        ) : (
                            <Statistic title="Bitcoin Amount (SAT)" value={(dashboard.amount || 0) * 100000000} precision={0} />
                        )}

                        {currency === 'usd' ? (
                            <Statistic title="Average Price ($)" prefix="$" value={(dashboard.average || 0) / dolar} precision={2} />
                        ) : (
                            <Statistic title="Average Price (R$)" prefix="R$" value={dashboard.average} precision={2} />
                        )}

                    </Col>
                    <Col span={12}>
                        {!!marketInfo && (
                            <>

                                <Statistic title="Market Price (24h)"  prefix={currency === 'usd' ? ("$") : ('R$')} value={marketInfo.market_data.current_price[currency]} precision={2} />
                                {marketInfo.market_data.price_change_percentage_24h > 0 ? (
                                    <Statistic

                                        value={marketInfo.market_data.price_change_percentage_24h}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                    />
                                ) : (
                                    <Statistic

                                        value={marketInfo.market_data.price_change_percentage_24h}
                                        precision={2}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                    />
                                )}

                            </>


                        )}

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}