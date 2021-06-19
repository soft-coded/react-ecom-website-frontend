import { Link } from "react-router-dom";

import "./navbar.scss";

export default function NavMenu() {
  return (
    <div className="navbar-menu">
      <div className="inner">
        <ul>
          <li>
            <Link to="/login">
              <h1>LOG IN</h1>
            </Link>
          </li>
          <li>
            <h1>ORDERS</h1>
          </li>
          <li>
            <h1>WISHLIST</h1>
          </li>
          <li>
            <h1>LOGOUT</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
