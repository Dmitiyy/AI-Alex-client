import { gql, useQuery } from '@apollo/client';
import { GetCurrenciesResponse } from './types';
import './styles.sass';

const GET_CURRENCIES = gql`
    query {
        exchangeRates {
            time, rates {
                code, rate, country, currency, id, amount
            }
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery<{
        exchangeRates: GetCurrenciesResponse
    }>(GET_CURRENCIES);

    const transformTime = (unix: number) => {
        if (unix === 0) return 0;
        return ((Date.now() - unix) / 60000).toFixed(2);
    }

    return (
        <div className='container'>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2 className='error'>Error, try again later</h2>
                ) : (
                    <>
                        <h2 className='cache'>
                            Cache: {transformTime(+data!.exchangeRates.time)} minutes
                        </h2>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                    <th>Code</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.exchangeRates.rates.map((item, idx) => {
                                        const { country, currency, amount, code, rate, id } = item;

                                        return (
                                            <tr key={String(id + idx)}>
                                                <td>{country}</td>
                                                <td>{currency}</td>
                                                <td>{amount}</td>
                                                <td>{code}</td>
                                                <td>{rate}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                )
            }
        </div>
    );
}

export default App;
