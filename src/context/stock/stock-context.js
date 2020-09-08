import React, { useContext, useReducer, createContext } from 'react';
import { stockReducer } from '@/context/stock/stock-reducer';
import {
    getStocksAction,
    getStockAction,
    setLoadingAction,
    setErrorAction,
    setFiltersAction,
    setSearchValue,
    setSelectValue,
    setClearAction,
    getPriceAction,
} from '@/context/stock/stock-actions';
import axios from 'axios';
import { Object } from 'core-js';

const StockContext = createContext();

export const useStock = () => {
    return useContext(StockContext);
};

const StockProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stockReducer, {
        error: false,
        loading: false,
        stocks: [],
        stock: {},
        price: null,
        filters: {},
        searchValue: '',
        selectValue: {
            region: '',
            assetClass: '',
            issuer: '',
        },
    });

    const requestRUSETFS = () =>
        axios.get('https://rusetfs.com/api/v1/screener');

    const requestMOEX = ticker =>
        axios.get(
            `https://iss.moex.com/iss/engines/stock/markets/shares/securities/${ticker}.json?iss.meta=off&iss.only=marketdata`
        );

    const setLoading = () => dispatch(setLoadingAction());
    const setError = error => dispatch(setErrorAction(error));
    const setClear = () => dispatch(setClearAction());

    const getStocks = async () => {
        try {
            setLoading();
            const response = await requestRUSETFS();
            dispatch(getStocksAction(response.data));
            setFilters(response.data);
        } catch (error) {
            setError(error);
        }
    };

    const getStock = async ticker => {
        try {
            setLoading();
            const response = await requestRUSETFS();
            const data = response.data.find(
                r => r.ticker.toUpperCase() === ticker.toUpperCase()
            );
            dispatch(getStockAction(data));
        } catch (error) {
            setError(error);
        }
    };

    const getPrice = async ticker => {
        try {
            const response = await requestMOEX(ticker);

            response.data.marketdata.data.forEach((acts, i) => {
                const data = acts.find(act => act === 'TQTF');

                if (data) {
                    response.data.marketdata.data[i][2] === null
                        ? dispatch(getPriceAction('Временно недоступно'))
                        : dispatch(
                              getPriceAction(
                                  response.data.marketdata.data[i][2]
                              )
                          );
                }
            });
        } catch (error) {
            setError(error);
        }
    };
    const setFilters = data => {
        const filters = {
            'assetClass': {
                type: 'Актив',
                options: [],
            },
            'region': {
                type: 'Регион',
                options: [],
            },
            'issuer': {
                type: 'Эмитент',
                options: [],
            },
        };

        Object.keys(filters).forEach((filter, i) => {
            let setTitle = new Set();
            let setValue = new Set();
            let options = [];

            data.forEach(item => {
                setTitle.add(item[filter].name);
                setValue.add(item[filter].id);
            });

            [...setTitle].forEach((_, ndx) => {
                options.push({
                    title: [...setTitle][ndx],
                    type: [...setValue][ndx],
                });
            });

            filters[filter].options = options;
        });

        dispatch(setFiltersAction(filters));
    };
    const makeSearch = value => {
        dispatch(setSearchValue(value));
    };

    const makeSelect = value => {
        dispatch(setSelectValue(value));
    };

    return (
        <StockContext.Provider
            value={{
                loading: state.loading,
                stocks: state.stocks,
                stock: state.stock,
                error: state.error,
                filters: state.filters,
                searchValue: state.searchValue,
                selectValue: state.selectValue,
                price: state.price,
                setLoading,
                setError,
                getStocks,
                getStock,
                makeSearch,
                makeSelect,
                setClear,
                getPrice,
            }}
        >
            {children}
        </StockContext.Provider>
    );
};

export default StockProvider;
