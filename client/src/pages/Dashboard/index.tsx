import { ArrowDownOutlined, ArrowUpOutlined, DollarCircleOutlined, UserSwitchOutlined } from "@ant-design/icons"
import { Progress, FloatButton, Row, Col, Statistic } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../../hooks/perfil"
import { ICoinGecko, IDashboardList } from "./models"
import { BTCInfo, DashboardList } from "./services/index.service"

const Dashboard: React.FC<any> = () => {
    const { profile } = useProfile()
    const navigate = useNavigate()
    const [dashboard, setDashboard] = useState<IDashboardList>({} as IDashboardList)
    const [percentage, setPercentage] = useState<number>(0)
    const [marketInfo, setMarketInfo] = useState<ICoinGecko>()

    useEffect(() => {
        DashboardList(profile.id).then((data) => {
            console.log(data);
            setDashboard(data)

        })

        BTCInfo().then((data) => {
            console.log(data);
            setMarketInfo(data)

        })
    }, [profile])

    useEffect(() => {
        console.log(Math.trunc(((profile.goal || 1) / (dashboard.amount || 0.0)) * 100));

        setPercentage(Math.trunc(((profile.goal || 1) / (dashboard.amount || 0.0)) * 100))
    }, [dashboard])

    // this page will show your wealth stats of your satoshis, average price, how much for 1 btc, how much satoshis
    return (
        <>

            <h1>Dashboard de {profile.name}</h1>
            <Row>
                <Col span={8}>
                    <Progress
                        status="active"
                        type="circle" percent={percentage} />
                    <Progress percent={percentage} status={percentage < 100 ? "active" : "success"} />
                    <FloatButton onClick={() => navigate('/')} icon={<UserSwitchOutlined />} type="primary" shape={'circle'} />
                </Col>
                <Col span={8}>
                    <Statistic title="Average Price ($)" value={dashboard.average} precision={2} />
                </Col>
                <Col span={8}>
                    {!!marketInfo && (
                        <>
                            <Statistic title="Market Price (24h)" value={marketInfo.market_data.current_price.brl} precision={2} />
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
        </>

    )
}

export default Dashboard
