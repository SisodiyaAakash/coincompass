import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CoinCompassIcon from "../assets/media/coincompass.svg";

const Header = () => {
   const location = useLocation(); // Get the current location

   return (
      <header className="header">
         <nav className="nav-wrapper container">
            <div className="navigation-area">
               <ul className="nav-list">
                  <li className={location.pathname === "/" ? "active" : ""}>
                     <Link to="/">Dashboard</Link>
                  </li>
                  <li className={location.pathname === "/transactions" ? "active" : ""}>
                     <Link to="/transactions">Transactions</Link>
                  </li>
                  {/* <li className={location.pathname === "/categories" ? "active" : ""}>
                     <Link to="/categories">Categories</Link>
                  </li>
                  <li className={location.pathname === "/goals" ? "active" : ""}>
                     <Link to="/goals">Goals</Link>
                  </li> */}
               </ul>
            </div>

            <div className="logo-area">
               <Link className="logo-link" to="/">
                  <img src={CoinCompassIcon} className="logo" />
               </Link>
            </div>

            <div className="profile-area">
               <span className="profile-inner">A</span>
            </div>
         </nav>
      </header>
   );
};

export default Header;
