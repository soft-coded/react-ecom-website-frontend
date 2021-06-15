import "./navbar.scss";

export default function NavMenu() {
  return (
    <div className="navbar-menu">
      <div className="inner">
        <ul>
          <li>
            <h1>ACCOUNT</h1>
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
