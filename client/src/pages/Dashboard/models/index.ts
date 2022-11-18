/* eslint-disable camelcase */
export interface IDashboardList {
    amount: number | undefined,
    average: number | undefined,
}

export interface ICoinGecko {
    market_data: {
        current_price: {
            brl: number,
            usd: number,
        }
        price_change_24h_in_currency: {
            brl: number,
            usd: number,
        }
        price_change_percentage_24h: number,
    }


}