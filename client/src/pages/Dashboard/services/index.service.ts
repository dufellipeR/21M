import api from "../../../services/api";
import gecko from "../../../services/gecko";
import dolar from "../../../services/dolar";
import { ICoinGecko, IDashboardList, IDolar } from "../models";

export const DashboardList = async (perfil: number) => {
    const { data } = await api.get<IDashboardList>(`/transaction/dashboard/?q=${perfil}`);

    return data
}

export const BTCInfo = async () => {
    const { data } = await gecko.get<ICoinGecko>(`/coins/bitcoin?tickers=false&community_data=false&developer_data=false`);

    return data
}

export const DolarInfo = async () => {
    const { data } = await dolar.get<IDolar>(`CotacaoMoedaAberturaOuIntermediario(codigoMoeda=@codigoMoeda,dataCotacao=@dataCotacao)?@codigoMoeda='USD'&@dataCotacao='11-18-2022'&$format=json&$select=cotacaoVenda`);

    return data.value
}




