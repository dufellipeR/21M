import api from "../../../services/api";
import { IProfile } from "../models";

export const profileList = async () => {
    const { data } = await api.get<IProfile[]>(`/perfil/`);

    return data
}



