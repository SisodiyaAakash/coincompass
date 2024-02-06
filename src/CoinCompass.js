import React from 'react';
import IncomeArrow from './assets/media/income-arrow.svg';
import ExpenseArrow from './assets/media/expense-arrow.svg';

const CoinCompass = () => {
  const categoryList = [
    {
      name: "Food",
      icon: require('./assets/media/transaction-category-icons/food-category.svg').default,
      transaction: -5870,
      color: '#FFC142'
    },
    {
      name: "Groceries",
      icon: require('./assets/media/transaction-category-icons/grocery-category.svg').default,
      transaction: -38870,
      color: '#D86EFD'
    },
    {
      name: "Shopping",
      icon: require('./assets/media/transaction-category-icons/shopping-category.svg').default,
      transaction: -26040,
      color: '#7031E7'
    },
    {
      name: "Entertainment",
      icon: require('./assets/media/transaction-category-icons/entertainment-category.svg').default,
      transaction: -1250,
      color: '#E23737'
    },
    {
      name: "Travel",
      icon: require('./assets/media/transaction-category-icons/travel-category.svg').default,
      transaction: -12450,
      color: '#04AE93'
    },
    {
      name: "Rent",
      icon: require('./assets/media/transaction-category-icons/rent-category.svg').default,
      transaction: -8065,
      color: '#1575CF'
    },
    {
      name: "Transfer",
      icon: require('./assets/media/transaction-category-icons/salary-category.svg').default,
      transaction: 1025900,
      color: '#FD956E'
    },
  ];

  // Calculate total income and expense
  const totalIncome = categoryList.filter(item => item.transaction > 0)
                                  .reduce((acc, item) => acc + item.transaction, 0);
  const totalExpense = categoryList.filter(item => item.transaction < 0)
                                   .reduce((acc, item) => acc + item.transaction, 0);
  const totalBalance = totalIncome + totalExpense;

  return (
    <div className='coin-compass-wrap'>
      <div className='container'>
        <div className='overview-dashboard'>
          <p className='sub-title'>Total Balance</p>
          <h2 className='net-balance'>₹ {totalBalance.toFixed(2)}</h2>

          <div className='transaction-figures'>
            <div className='income figure-wrapper'>
              <div className='arrow-wrap'>
                <img src={IncomeArrow} alt='income-arrow' />
              </div>
              <div className='content'>
                <p>Income</p>
                <h5 className='figure-digit'>₹ {totalIncome.toFixed(2)}</h5>
              </div>
            </div>

            <div className='expense figure-wrapper'>
              <div className='arrow-wrap'>
                <img src={ExpenseArrow} alt='expense-arrow' />
              </div>
              <div className='content'>
                <p>Expense</p>
                <h5 className='figure-digit'>₹ {Math.abs(totalExpense).toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className='categorized-transactions-wrap'>
          <div className='heading-section'>
            <h5 className='heading'>Transactions</h5>
            <a className='redirect-btn view-all-btn' href='#view-all'>View All</a>
          </div>
          <div className='transaction-list'>
            {categoryList.map((item, index) => (
              <div className='transaction-list-itm' key={index}>
                <div className='content-section'>
                  <span className='icon-wrap' style={{ backgroundColor: item.color }}>
                    <img className='icon' src={item.icon} alt={item.name} />
                  </span>
                  <h5>{item.name}</h5>
                </div>
                <div className='number-section'>
                  <h5>{item.transaction.toFixed(2)}₹</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinCompass;
