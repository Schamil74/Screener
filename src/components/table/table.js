import React from 'react';
import withClazz from '@/hoc/withClazz';
import { Link } from 'react-router-dom';
import { stocksDictionary as dictionary } from '@/components/pages/dictionary.js';

function selection(obj) {
    const titleHead = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (
                key === 'ticker' ||
                key === 'region' ||
                key === 'assetClass' ||
                key === 'issuer'
            ) {
                titleHead.push(key);
            }
        }
    }
    return titleHead;
}

const Table = props => {
    const { clazz, stocks } = props;

    if (!stocks.length) {
        return null;
    }

    const headCell = selection(stocks[0]).map((cell, i) => (
        <div className="table__cell table__cell_head" key={i}>
            {dictionary[cell]}
        </div>
    ));

    const bodyCell = stock =>
        selection(stock).map((cell, i) => (
            <div className="table__cell table__cell_body" key={i}>
                {stock[cell].name || (
                    <Link className={'table__link'} to={'/' + stock[cell]}>
                        {stock[cell]}
                    </Link>
                )}
            </div>
        ));

    const bodyTr = stocks.map((stock, i) => (
        <div className="table__tr" key={i}>
            {bodyCell(stock)}
        </div>
    ));

    return (
        <div className={clazz}>
            <div className="table__thead">
                <div className="table__tr">{headCell}</div>
            </div>
            <div className="table__tbody">{bodyTr}</div>
        </div>
    );
};

export default withClazz(Table, 'table');
