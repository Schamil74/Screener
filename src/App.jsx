import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '@/components/header/header';
import StockDetail from '@/components/pages/stock-detail/stock-detail.js';
import StockList from '@/components/pages/stock-list/stock-list';
import StockProvider from '@/context/stock/stock-context';

const App = () => {
    return (
        <StockProvider>
            <BrowserRouter basename={PUBLIC_PATH.toString()}>
                <div className="app__wrapper">
                    <Header title="Screener MOEX ETF" name={''} />

                    <main className="main app__main">
                        <div className="container main__container">
                            <Switch>
                                <Route path={'/'} exact component={StockList} />

                                <Route
                                    path={'/:ticker'}
                                    render={props => (
                                        <StockDetail
                                            {...props}
                                            title={`Props through render`}
                                        />
                                    )}
                                />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </main>
                </div>
            </BrowserRouter>
        </StockProvider>
    );
};

export default App;
