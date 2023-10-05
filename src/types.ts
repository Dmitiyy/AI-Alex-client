export type Currency = {
  code: string
  country: string
  currency: string
  id: number
  amount: number
  rate: number
}

export interface GetCurrenciesResponse {
  rates: Currency[]
  time: string
}