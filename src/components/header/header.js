import React from 'react';

const header = props => {
    const { title, name } = props;

    return (
        <header className="header app__header">
            <div className="container header__container">
                <h1 className="typo typo_xl">{title}</h1>
                <p className="typo typo_lg">{name}</p>
            </div>
        </header>
    );
};

export default header;
