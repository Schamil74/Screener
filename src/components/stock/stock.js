import {
    revenueDictionary,
    stockDictionary as dictionary,
} from '@/components/pages/dictionary.js';
import { useStock } from '@/context/stock/stock-context';
import withClazz from '@/hoc/withClazz';
import React from 'react';
import { Link } from 'react-router-dom';

const Stock = ({ clazz }) => {
    const { stock, price } = useStock();

    if (!Object.keys(stock).length) {
        return null;
    }

    const {
        region,
        assetClass,
        assetSubClass,
        issuer,
        currency,
        revenueByCurrency,
    } = stock;

    const propsObj = [];
    const revenueArr = [];

    const values = Object.values(dictionary);

    [region, assetClass, assetSubClass, issuer, currency].forEach((obj, i) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const name = obj[key];
                if (key === 'name') {
                    propsObj.push({ title: values[i], name });
                }
            }
        }
    });

    Object.keys(revenueByCurrency['RUB']).forEach(rev => {
        revenueArr.push({
            title: revenueDictionary[rev],
            val: revenueByCurrency['RUB'][rev],
        });
    });

    return (
        <div className={clazz}>
            <Link className="btn btn_alert stock__back" to={'/'}>
                Назад
            </Link>

            <h2 className={'stock__title typo typo_lgl'}>{stock.ticker}</h2>

            <div className="stock__table">
                {propsObj.map(({ title, name }, i) => (
                    <div className="stock__row" key={i}>
                        <div className="stock__prop typo typo_lg">
                            {title}:{' '}
                        </div>
                        <div className="stock__val typo typo_lg">{name}</div>
                    </div>
                ))}

                <div className="stock__row">
                    <div className="stock__prop typo typo_lg">Цена: </div>
                    <div className="stock__val typo typo_lg">
                        {price + ' руб.'}
                    </div>
                </div>

                <div className="stock__row">
                    <div className="stock__prop typo typo_lg">
                        Дивидендная политика:
                    </div>
                    <div className="stock__val typo typo_lg">
                        {stock.dividendPolicy}
                    </div>
                </div>

                <div className="stock__row">
                    <div className="stock__prop typo typo_lg">Комиссия: </div>
                    <div
                        className="stock__val typo typo_lg"
                        style={{ color: 'yellow' }}
                    >
                        {(stock.commisionPercent * 100).toFixed(2) + '%'}
                    </div>
                </div>

                <div className="stock__row">
                    <div className="stock__prop typo typo_lg">
                        Дата запуска:
                    </div>
                    <div className="stock__val typo typo_lg">
                        {stock.tradingStartDate}
                    </div>
                </div>

                <div className="stock__row">
                    <div className="stock__prop typo typo_lg">
                        Доходность рублевая:{' '}
                    </div>
                    <div className="stock__val typo typo_lg">
                        <ul>
                            {revenueArr.map(({ title, val }, i) => {
                                let style = null;

                                val < 0
                                    ? (style = { color: 'red' })
                                    : (style = { color: 'green' });

                                return (
                                    <li key={i}>
                                        {title} :{' '}
                                        <span style={style}>
                                            {(val * 100).toFixed(2) + '%'}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withClazz(Stock, 'stock');
