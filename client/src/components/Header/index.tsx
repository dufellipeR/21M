import { Avatar, Col, Divider, Radio, Row, Segmented, } from "antd"
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

    const [segmentOpt, setSegmentOpt] = useState<{ label: any, value: any }[]>([])
    const [profiles, setProfiles] = useState<IProfile[]>([])

    const { updateProfile } = useProfile()

    const { currency, updateCurrency } = useCurrency()
    const { format, updateFormat } = useFormat()

    useEffect(() => {
        profileList().then((data) => {

            setProfiles(data)
            setSegmentOpt(data.map(profile => {
                return {
                    label: (
                        <div style={{ padding: 4 }}>
                            <Avatar src={`https://joeschmoe.io/api/v1/${profile.id}`} />
                            <div>{profile.name}</div>
                        </div>
                    ),
                    value: profile
                }
            }))

        })
    }, [])

    const handleSwitchProfile = (profile: any) => {
        updateProfile(profile)
    }

    return (
        <>

            <Row style={{ marginTop: 24 }}>
                <Col offset={1} span={20}>
                    <Segmented
                        options={segmentOpt} onResize={undefined} onResizeCapture={undefined} onChange={handleSwitchProfile} />
                </Col>
                <Col span={2} >
                    <Radio.Group
                        style={{ marginBottom: 10 }}
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

                </Col>

            </Row>


            {/* <Divider /> */}
        </>
    )
}