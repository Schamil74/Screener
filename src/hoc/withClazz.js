import React from 'react';

const withClazz = (Component, classname) => props => {
    const { clazz, ...elemProps } = props;
    const cls = [classname];

    if (clazz) {
        cls.push(clazz);
    }

    return <Component clazz={cls.join(' ')} {...elemProps} />;
};

export default withClazz;
