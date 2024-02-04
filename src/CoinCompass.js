import React, { useState } from 'react';
import IncomeArrow from './assets/media/income-arrow.svg'
import ExpenseArrow from './assets/media/expense-arrow.svg'

const CoinCompass = () => {
  return (
    <div className='coin-compass-wrap'>
      <div className='container'>
        <div className='overview-dashboard'>
          <p className='sub-title'>Total Balance</p>
          <h2 className='net-balance'>₹ 659457.00</h2>

          <div className='transaction-figures'>
            <div className='income figure-wrapper'>
              <div className='arrow-wrap'>
                <img src={IncomeArrow} alt='income-arrow' />
              </div>
              <div className='content'>
                <p>Income</p>
                <h5 className='figure-digit'>783457.00</h5>
              </div>
            </div>

            <div className='expense figure-wrapper'>
              <div className='arrow-wrap'>
                <img src={ExpenseArrow} alt='expense-arrow' />
              </div>
              <div className='content'>
                <p>Expense</p>
                <h5 className='figure-digit'>124000.00</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinCompass;
