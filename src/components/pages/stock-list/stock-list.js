import React, { Fragment, useEffect } from 'react';
import { useStock } from '@/context/stock/stock-context';
import Loader from '@/components/ui/loader/loader';
import Table from '@/components/table/table';
import Filter from '@/components/filter/filter';

const StockList = () => {
    const { loading, stocks, searchValue, selectValue, getStocks } = useStock();

    useEffect(() => {
        getStocks();
    }, []);

    const filteredStocks = (stocks, searchValue, selectValue) => {
        let filtered = filtered || stocks;

        Object.keys(selectValue).forEach(param => {
            if (selectValue[param] !== '') {
                filtered = filtered.filter(
                    stock => stock[param].id === selectValue[param]
                );
            }
        });

        filtered = filtered.filter(stock => {
            return (
                stock.ticker.toUpperCase().indexOf(searchValue.toUpperCase()) >
                -1
            );
        });

        return filtered;
    };

    return loading ? (
        <Loader />
    ) : (
        <Fragment>
            <Filter clazz="filter_main" />
            <Table
                stocks={filteredStocks(stocks, searchValue, selectValue)}
                clazz="table_main"
            />
        </Fragment>
    );
};

export default StockList;
