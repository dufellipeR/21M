import api from "../../../services/api";
import gecko from "../../../services/gecko";
import { ICoinGecko, IDashboardList } from "../models";

export const DashboardList = async (perfil: number) => {
    const { data } = await api.get<IDashboardList>(`/transaction/dashboard/?q=${perfil}`);

    return data
}

export const BTCInfo = async () => {
    const { data } = await gecko.get<ICoinGecko>(`/coins/bitcoin?tickers=false&community_data=false&developer_data=false`);

    return data
}




