import React from 'react';
import withClazz from '@/hoc/withClazz';

const Form = props => {
    const { clazz } = props;

    return (
        <form className={clazz} onSubmit={ev => ev.preventDefault()}>
            <div className="form__list"></div>
        </form>
    );
};

export default withClazz(Form, 'form');
