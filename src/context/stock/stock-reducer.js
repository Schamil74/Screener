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

const handlers = {
    [GET_STOCKS]: (state, { payload }) => ({
        ...state,
        stocks: payload,
        loading: false,
    }),

    [GET_STOCK]: (state, { payload }) => ({
        ...state,
        stock: payload,
        loading: false,
    }),

    [GET_PRICE]: (state, { payload }) => ({
        ...state,
        price: payload,
        loading: false,
    }),

    [SET_FILTER]: (state, { payload }) => ({
        ...state,
        filters: payload,
    }),

    [SET_SEARCH_VALUE]: (state, { payload }) => ({
        ...state,
        searchValue: payload,
    }),

    [SET_SELECT_VALUE]: (state, { payload }) => ({
        ...state,
        selectValue: { ...state.selectValue, ...payload },
    }),

    [SET_CLEAR]: state => ({
        ...state,
        searchValue: '',
        selectValue: {
            region: '',
            assetClass: '',
            issuer: '',
        },
    }),

    [SET_LOADING]: state => ({
        ...state,
        loading: true,
    }),

    [SET_ERROR]: state => ({
        ...state,
        loading: false,
        error: true,
    }),

    DEFAULT: state => state,
};

export const stockReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};
