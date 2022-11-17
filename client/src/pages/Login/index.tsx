import { AntDesignOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import defaultAvatar from "../../../assets/avatar.png"

const Login: React.FC<any> = () => {

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Choose Profile</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" style={{ border: 0, backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                    <Avatar
                        src={defaultAvatar}
                        size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 100 }}
                    />
                    <span>Citadel</span>
                </button>

                <button type="button" style={{ border: 0, backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                    <Avatar
                        src={defaultAvatar}
                        size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 100 }}
                    />
                    <span>Citadel</span>
                </button>
            </div>
        </>
    )
}

export default Login