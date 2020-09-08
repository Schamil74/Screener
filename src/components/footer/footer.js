import React from 'react';

const Footer = props => {
    const { title, name } = props;
    return (
        <footer className="footer app__footer">
            <div className="container footer__container">
                <h2 className="typo typo_xl">{title}</h2>
                <p className="typo typo_lg">{name}</p>
            </div>
        </footer>
    );
};

export default Footer;
