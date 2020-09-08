import React from 'react';
import withClazz from '@/hoc/withClazz';
import { useStock } from '@/context/stock/stock-context';

const Input = props => {
    const type = props.type || 'text';
    const { id, name, clazz, readonly, children, value, placeholder } = props;
    const { makeSearch } = useStock();

    const onChange = ev => {
        makeSearch(ev.target.value.trim());
    };

    return (
        <div className={clazz}>
            <input
                id={id}
                className={'input__field'}
                name={name}
                type={type}
                autoComplete="off"
                readOnly={readonly}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...children}
            />
        </div>
    );
};

export default withClazz(Input, 'input');
