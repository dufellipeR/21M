import api from "../../../services/api";
import gecko from "../../../services/gecko";
import dolar from "../../../services/dolar";
import { ICoinGecko, IDashboardList, IDolar, ITransaction } from "../models";
import { GenericAbortSignal } from "axios";

export const DashboardList = async (perfil: number, signal: GenericAbortSignal) => {
    const { data } = await api.get<IDashboardList>(`/transaction/dashboard/?perfil=${perfil}`, { signal});

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

export const TransactionList = async (perfil: number, abortSignal: GenericAbortSignal ) => {
    const { data } = await api.get<ITransaction[]>(`/transaction/?perfil=${perfil}` , { signal: abortSignal});

    return data
}




