import React, { Fragment } from 'react';
import Icon from '@/components/ui/icon/icon';
import withClazz from '@/hoc/withClazz';

const Btn = props => {
    const type = props.type || 'a';
    const { href, text, children, icon, disabled, clazz, onClick } = props;
    console.log();

    const withText = <span className="btn__text">{text}</span>;

    const withIcon = (
        <Fragment>
            <Icon clazz={`icon_${icon} btn__icon`} />
            {withText}
        </Fragment>
    );

    const btn = (
        <button
            type={type}
            className={clazz}
            disabled={disabled}
            onClick={onClick}
            {...children}
        >
            {icon ? withIcon : withText}
        </button>
    );

    const link = (
        <a href={href} className={clazz} onClick={props.onClick} {...children}>
            {icon ? withIcon : withText}
        </a>
    );

    return type === 'a' ? link : btn;
};

export default withClazz(Btn, 'btn');
