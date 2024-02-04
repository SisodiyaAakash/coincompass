import CoinCompassIcon from "../assets/media/coincompass.svg";

const Header = () => {
   return (
      <header className="header">
         <nav className="nav-wrapper container">
            <div className="navigation-area">
               <ul className="nav-list">
                  <li className="active">
                     <a href="#">Dashboard</a>
                  </li>
                  <li className="">
                     <a href="#">Transactions</a>
                  </li>
                  <li className="">
                     <a href="#">Categories</a>
                  </li>
                  <li className="">
                     <a href="#">Goals</a>
                  </li>
               </ul>
            </div>

            <div className="logo-area">
               <a className="logo-link" href="#">
                  <img src={CoinCompassIcon} className="logo" />
               </a>
            </div>

            <div className="profile-area">
               <span className="profile-inner">A</span>
            </div>
         </nav>
      </header>
   );
};

export default Header;
