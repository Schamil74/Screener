import React from 'react';
import withClazz from '@/hoc/withClazz';

const Logo = props => {
    const { href, src, alt, text, clazz } = props;

    return (
        <a className={clazz} href={href}>
            <img className={'logo__img'} src={src} alt={alt} />
            {text && text}
        </a>
    );
};

export default withClazz(Logo, 'logo');
