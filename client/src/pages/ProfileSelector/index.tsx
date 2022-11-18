
import { Avatar } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import defaultAvatar from "../../../assets/avatar.png"
import { useProfile } from "../../hooks/perfil"
import { IProfile } from "./models"
import { profileList } from "./services/index.service"



const ProfileSelector: React.FC<any> = () => {

    const [profiles, setProfiles] = useState<IProfile[]>([])
    const { updateProfile } = useProfile();

    const navigate = useNavigate()

    const profileChoosen = (profile: IProfile) => {
        console.log(profile);
        updateProfile(profile)
        navigate('/dashboard')
        
    }

    useEffect(() => {
        profileList().then((data) => {
            console.log(data);
            setProfiles(data)

        })
    }, [])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Choose Profile</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {!!profiles.length && profiles.map((profile) => (
                    <button key={profile.id} type="button" onClick={() => profileChoosen(profile)} style={{ border: 0, backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Avatar
                            src={defaultAvatar}
                            size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 100 }}
                        />
                        <span style={{ color: "#606060"}}>{profile.name}</span>
                    </button>
                ))}
            </div>
        </>
    )
}

export default ProfileSelector