import { Progress } from "antd"

const Dashboard: React.FC<any> = () => {


    // this page will show your wealth stats of your satoshis, average price, how much for 1 btc, how much satoshis
    return (
        <>
            <h1>Dashboard</h1>
            <Progress
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                type="circle" percent={21} />
        </>

    )
}

export default Dashboard
