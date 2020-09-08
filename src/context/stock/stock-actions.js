import {
    GET_STOCKS,
    GET_STOCK,
    SET_LOADING,
    SET_ERROR,
    SET_FILTER,
    SET_SEARCH_VALUE,
    SET_SELECT_VALUE,
    SET_CLEAR,
    GET_PRICE,
} from '@/context/stock/stock-types';

export const getStocksAction = data => ({ type: GET_STOCKS, payload: data });
export const getStockAction = data => ({ type: GET_STOCK, payload: data });
export const setLoadingAction = () => ({ type: SET_LOADING });
export const setErrorAction = data => ({ type: SET_ERROR, payload: data });
export const setFiltersAction = data => ({ type: SET_FILTER, payload: data });
export const setSearchValue = data => ({
    type: SET_SEARCH_VALUE,
    payload: data,
});

export const setSelectValue = data => ({
    type: SET_SELECT_VALUE,
    payload: data,
});

export const setClearAction = () => ({ type: SET_CLEAR });

export const getPriceAction = data => ({ type: GET_PRICE, payload: data });
