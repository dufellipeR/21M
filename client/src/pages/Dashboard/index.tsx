import { GithubOutlined, HeartTwoTone, MenuOutlined } from "@ant-design/icons"
import { FloatButton, Tabs, } from "antd"

import { Header } from "../../components/Header"

import { items } from "./components/tabsItems"


const Dashboard: React.FC<any> = () => {


    return (
        <>
            <Header />
            <Tabs
                defaultActiveKey="home"
                centered
                items={items}
            />


            <FloatButton.Group icon={<MenuOutlined />} type="primary" trigger="hover">
                <FloatButton tooltip={<div>Git</div>} icon={<GithubOutlined />} />
                <FloatButton tooltip={<div>Donate</div>} icon={<HeartTwoTone twoToneColor="#eb2f96" />} />
            </FloatButton.Group>
        </>

    )
}

export default Dashboard
