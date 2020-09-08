import React, { useState } from 'react';
import withClazz from '@/hoc/withClazz';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/select';
import Btn from '@/components/ui/btn/btn';
import { useStock } from '@/context/stock/stock-context';

const Filter = props => {
    const { clazz } = props;

    const {
        filters,
        makeSearch,
        searchValue,
        makeSelect,
        selectValue,
        setClear,
    } = useStock();

    return (
        <div className={clazz}>
            <div className="filter__list">
                <div className="filter__col">
                    <Input
                        clazz="input_regular"
                        placeholder="Поиск по тикеру"
                        value={searchValue}
                        onChange={makeSearch}
                    />
                </div>
                {Object.keys(filters).map((filter, i) => {
                    const { type, options } = filters[filter];

                    return (
                        <div className="filter__col" key={i}>
                            <Select
                                value={selectValue[filter]}
                                name={filter}
                                type={type}
                                options={options}
                                onChange={makeSelect}
                            ></Select>
                        </div>
                    );
                })}
                <div className="filter__col">
                    <Btn
                        type="button"
                        text="Очистить"
                        clazz="btn_alert btn_wide"
                        onClick={setClear}
                    />
                </div>
            </div>
        </div>
    );
};

export default withClazz(Filter, 'filter');
