import React, { Fragment } from 'react';
import withClazz from '@/hoc/withClazz';
import { useStock } from '@/context/stock/stock-context';

const Select = props => {
    const { clazz, type, options, value, name } = props;
    const { makeSelect } = useStock();

    const onChange = ev => {
        makeSelect({
            [ev.target.name]: ev.target.value,
        });
    };

    const opts = options.map((option, index) => (
        <option value={option.type} key={option.type + index}>
            {option.title}
        </option>
    ));

    return (
        <div className={clazz}>
            <select
                name={name}
                className="select__dropdown"
                onChange={onChange}
                value={value}
            >
                <Fragment>
                    <option disabled defaultValue value="">
                        {type ? 'Выберите ' + type : 'Выберите'}
                    </option>
                    {opts}
                </Fragment>
            </select>
        </div>
    );
};

export default withClazz(Select, 'select');
