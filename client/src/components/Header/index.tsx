import { Avatar, Col, Divider, Radio, Row, Segmented, Space, } from "antd"
import { SegmentedValue } from "antd/es/segmented"
import { useEffect, useState } from "react"
import { useCurrency } from "../../hooks/currency"
import { useFormat } from "../../hooks/format"
import { useProfile } from "../../hooks/perfil"
import { IProfile } from "../../pages/ProfileSelector/models"
import { profileList } from "../../pages/ProfileSelector/services/index.service"

const optionsCurrency = [
    { label: 'USD', value: 'usd' },
    { label: 'BRL', value: 'brl' },
];

const optionsFormat = [
    { label: 'BTC', value: 'btc' },
    { label: 'SAT', value: 'sat' },
];

export const Header: React.FC<any> = () => {

    const [segmentOpt, setSegmentOpt] = useState<{ label: any, value: number }[]>([])
    const [profiles, setProfiles] = useState<IProfile[]>([])

    const { profile, updateProfile } = useProfile()

    const { currency, updateCurrency } = useCurrency()
    const { format, updateFormat } = useFormat()

    useEffect(() => {


        profileList().then((data) => {
            setProfiles(data)
            setSegmentOpt(data.map(_profile => {
                return {
                    label: (
                        <div style={{ padding: 4 }}>
                            <Avatar src={`https://joeschmoe.io/api/v1/${_profile.id}${_profile.name}`} />
                            <div>{_profile.name}</div>
                        </div>
                    ),
                    value: _profile.id
                }
            }))
        })

    }, [])

    const handleSwitchProfile = (id: any) => {
        const selectedProfile = profiles.find((i) => id === i.id)
        if (selectedProfile) {
            updateProfile(selectedProfile)
        }

    }

    return (
        <>

            <Row style={{ marginTop: 24 }}>
                <Col offset={1} span={20}>
                    <Segmented
                        options={segmentOpt} value={profile.id} onResize={() => {}} onResizeCapture={() => {}} onChange={handleSwitchProfile} />
                </Col>
                <Col span={2} >
                    <Space size="small" direction="vertical" >
                        <Radio.Group
                            options={optionsFormat}
                            onChange={(e) => updateFormat(e.target.value)}
                            value={format}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        <Radio.Group

                            options={optionsCurrency}
                            onChange={(e) => updateCurrency(e.target.value)}
                            value={currency}
                            optionType="button"
                            buttonStyle="outline"
                        />
                    </Space>


                </Col>

            </Row>


            {/* <Divider /> */}
        </>
    )
}