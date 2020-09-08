import React from 'react';
import withClazz from '@/hoc/withClazz';

const Icon = props => {
    return <i className={props.clazz}></i>;
};

export default withClazz(Icon, 'icon');
