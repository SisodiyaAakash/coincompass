import React from 'react';
import ReactDOM from 'react-dom';
import './styling/main.css';
import Header from './comps/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './comps/Footer';

import Dashboard from './navigations/Dashboard';
import Transactions from './navigations/Transactions';
import Categories from './navigations/Categories';
import Goals from './navigations/Goals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the entire application with Router */}
      <Header />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/categories" component={Categories} />
        <Route path="/goals" component={Goals} />
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>
);
