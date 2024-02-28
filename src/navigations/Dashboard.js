import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IncomeArrow from '../assets/media/income-arrow.svg';
import ExpenseArrow from '../assets/media/expense-arrow.svg';
import Dexie from 'dexie';

// Initialized Dexie database
const db = new Dexie('transactionsDatabase');
db.version(10).stores({
  transactions: '++id, category, amount, type'
});

const Dashboard = () => {
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    amount: 0,
    type: 'expense' // Default type is expense
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [categoryList, setCategoryList] = useState([
    {
      name: "Food",
      icon: require('../assets/media/transaction-category-icons/food-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#FFC142'
    },
    {
      name: "Groceries",
      icon: require('../assets/media/transaction-category-icons/grocery-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#D86EFD'
    },
    {
      name: "Shopping",
      icon: require('../assets/media/transaction-category-icons/shopping-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#7031E7'
    },
    {
      name: "Entertainment",
      icon: require('../assets/media/transaction-category-icons/entertainment-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#E23737'
    },
    {
      name: "Travel",
      icon: require('../assets/media/transaction-category-icons/travel-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#04AE93'
    },
    {
      name: "Rent",
      icon: require('../assets/media/transaction-category-icons/rent-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#1575CF'
    },
    {
      name: "Transfer",
      icon: require('../assets/media/transaction-category-icons/transfer-category.svg').default,
      transaction: 0, // Initialize transaction property
      color: '#FD956E'
    },
  ]);

  useEffect(() => {
    fetchTransactions(); // Fetch transactions on component mount
  }, []);

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

  useEffect(() => {
    // Update transaction type based on the selected category
    if (newTransaction.category === "Transfer") {
      setNewTransaction(prevState => ({ ...prevState, type: 'expense' }));
    } else {
      setNewTransaction(prevState => ({ ...prevState, type: 'expense' }));
    }
  }, [newTransaction.category]);

  const fetchTransactions = () => {
    db.transactions.toArray().then(transactions => {
      const updatedCategoryList = categoryList.map(category => {
        const categoryTransactions = transactions.filter(transaction => transaction.category === category.name);
        const categoryTransactionAmount = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        return {
          ...category,
          transaction: categoryTransactionAmount
        };
      });
      setCategoryList(updatedCategoryList);
    });
  };

  const totalIncome = categoryList.filter(item => item.transaction > 0)
    .reduce((acc, item) => acc + item.transaction, 0);
  const totalExpense = categoryList.filter(item => item.transaction < 0)
    .reduce((acc, item) => acc + item.transaction, 0);
  const totalBalance = totalIncome + totalExpense;

  const handleAddTransaction = () => {
    const { category, amount, type, description } = newTransaction;
    db.transactions
      .add({
        category,
        amount: type === 'income' ? amount : -amount, // Adjust amount based on type
        type,
        description
      })
      .then(() => {
        fetchTransactions(); // Fetch transactions after adding new transaction
        setNewTransaction({ ...newTransaction, amount: 0, description: '' }); // Reset form
        setIsPopupOpen(false); // Close popup
      })
      .catch(error => console.error('Error adding transaction: ', error));
  };

  // Render transaction type options dynamically based on the selected category
  const renderTransactionTypeOptions = () => {
    if (newTransaction.category === "Transfer") {
      return (
        <>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </>
      );
    } else {
      return <option value="expense">Expense</option>;
    }
  };


  // Render category options
  const renderCategoryOptions = () => {
    return (
      <>
        {categoryList.map((category, index) => (
          <option key={index} value={category.name}>{category.name}</option>
        ))}
      </>
    );
  };

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

      {/* Popup content */}
      {isPopupOpen && (
        <div className="transaction-popup-wrap">
          <div className="popup-content">
            <h3 className='heading'>Add Transaction</h3>

            <form className='transaction-form'>
              <div className='form-body'>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
                />

                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {renderCategoryOptions()}
                </select>

                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                >
                  {renderTransactionTypeOptions()}
                </select>

                <input
                  type="text"
                  placeholder="Description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                />
              </div>

              <div className='form-footer'>
                <button type='button' className='add-btn' onClick={handleAddTransaction}>Add Transaction</button>
                <button type='button' className='cancel-btn' onClick={() => setIsPopupOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
