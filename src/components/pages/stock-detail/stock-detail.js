import React, { useEffect } from 'react';
import { useStock } from '@/context/stock/stock-context';
import { useParams } from 'react-router-dom';
import Loader from '@/components/ui/loader/loader';
import Stock from '@/components/stock/stock';

const StockDetail = () => {
    const { getStock, loading, getPrice } = useStock();

    // use useParams
    let { ticker } = useParams();
    // or match.params
    // const urlName = props.match.params.ticker;

    useEffect(() => {
        getStock(ticker.toUpperCase());
        getPrice(ticker.toUpperCase());
    }, []);

    return loading ? <Loader /> : <Stock />;
};

export default StockDetail;
