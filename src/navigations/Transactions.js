import React, { useState, useEffect } from 'react';
import FoodIcon from '../assets/media/transaction-category-icons/food-category.svg';
import GroceriesIcon from '../assets/media/transaction-category-icons/grocery-category.svg';
import ShoppingIcon from '../assets/media/transaction-category-icons/shopping-category.svg';
import EntertainmentIcon from '../assets/media/transaction-category-icons/entertainment-category.svg';
import TravelIcon from '../assets/media/transaction-category-icons/travel-category.svg';
import RentIcon from '../assets/media/transaction-category-icons/rent-category.svg';
import TransferIcon from '../assets/media/transaction-category-icons/transfer-category.svg';

import Dexie from 'dexie';

const db = new Dexie('transactionsDatabase');
db.version(10).stores({
  transactions: '++id, category, amount, type, description'
});

const Transactions = ({ categoryColors }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    db.transactions.toArray().then(transactions => {
      setTransactions(transactions);
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return FoodIcon;
      case "Groceries":
        return GroceriesIcon;
      case "Shopping":
        return ShoppingIcon;
      case "Entertainment":
        return EntertainmentIcon;
      case "Travel":
        return TravelIcon;
      case "Rent":
        return RentIcon;
      case "Transfer":
        return TransferIcon;
      default:
        return null;
    }
  };

  return (
    <div className='transaction-nav component-wrap'>
      <h3 className='nav-title'>Recent Transactions</h3>

      {transactions.length > 0 ? (
        <ul className='transactions'>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <div className='transaction-icon'>
                <img src={getCategoryIcon(transaction.category)} alt={transaction.category} />
              </div>
              <div className='transaction-content'>
                <p>{transaction.description}</p>
              </div>
              <div className='transaction-value'>
                <h6 className={transaction.type}>{transaction.amount}</h6>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available</p>
      )}
    </div>
  );
};

export default Transactions;
