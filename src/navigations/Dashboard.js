import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IncomeArrow from '../assets/media/income-arrow.svg';
import ExpenseArrow from '../assets/media/expense-arrow.svg';

const Dashboard = () => {
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    amount: 0,
    type: 'expense'
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [categoryList, setCategoryList] = useState([
    {
      name: "Food",
      icon: require('../assets/media/transaction-category-icons/food-category.svg').default,
      transaction: -5870,
      color: '#FFC142'
    },
    {
      name: "Groceries",
      icon: require('../assets/media/transaction-category-icons/grocery-category.svg').default,
      transaction: -38870,
      color: '#D86EFD'
    },
    {
      name: "Shopping",
      icon: require('../assets/media/transaction-category-icons/shopping-category.svg').default,
      transaction: -26040,
      color: '#7031E7'
    },
    {
      name: "Entertainment",
      icon: require('../assets/media/transaction-category-icons/entertainment-category.svg').default,
      transaction: -1250,
      color: '#E23737'
    },
    {
      name: "Travel",
      icon: require('../assets/media/transaction-category-icons/travel-category.svg').default,
      transaction: -12450,
      color: '#04AE93'
    },
    {
      name: "Rent",
      icon: require('../assets/media/transaction-category-icons/rent-category.svg').default,
      transaction: -8065,
      color: '#1575CF'
    },
    {
      name: "Transfer",
      icon: require('../assets/media/transaction-category-icons/salary-category.svg').default,
      transaction: 1025900,
      color: '#FD956E'
    },
  ]);

  // Calculate total income and expense
  const totalIncome = categoryList.filter(item => item.transaction > 0)
    .reduce((acc, item) => acc + item.transaction, 0);
  const totalExpense = categoryList.filter(item => item.transaction < 0)
    .reduce((acc, item) => acc + item.transaction, 0);
  const totalBalance = totalIncome + totalExpense;

  const handleAddTransaction = () => {
    const updatedCategoryList = [...categoryList];
    const index = updatedCategoryList.findIndex(cat => cat.name === newTransaction.category);
    if (index !== -1) {
      updatedCategoryList[index].transaction += (newTransaction.type === 'income' ?
        newTransaction.amount : -newTransaction.amount);
      setCategoryList(updatedCategoryList);
      setNewTransaction({ ...newTransaction, amount: 0 });
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isPopupOpen]);

  return (
    <div className='coin-compass-wrap dashboard-wrap'>
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

          {/* Plus button to open popup */}
          <button className='add-transaction' onClick={() => setIsPopupOpen(true)}>+</button>
        </div>

        <div className='categorized-transactions-wrap'>
          <div className='heading-section'>
            <h5 className='heading'>Transactions</h5>
            <Link to="/transactions">View All</Link>
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


      {/* Popup for the Transaction add form */}
      {isPopupOpen && (
        <div className="transaction-popup-wrap">
          <div className="popup-content">
            <h3 className='heading'>Add Transaction</h3>

            <form className='transaction-form'>
              <div className='form-body'>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categoryList.map((category, index) => (
                    <option key={index} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                />
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div className='form-footer'>
                <button className='add-btn' onClick={handleAddTransaction}>Add Transaction</button>
                <button className='cancel-btn' onClick={() => setIsPopupOpen(false)}>Cancel</button> {/* Cancel button to close popup */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
