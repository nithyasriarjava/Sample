import "./navbar.css";
import { useState } from "react";

function NavBar() {
  let [isNavbarOpen, setNavbarOpen] = useState(false);
  function setToOpen() {
    setNavbarOpen(true);
  }
  function setToClose() {
    setNavbarOpen(false);
  }
  return (
    <div className="navbar-style" >
      {isNavbarOpen ?
        (<div className={`navbar-inside-style ${isNavbarOpen ? "open" : ""}`}>
          <div className="hamburger-menu-close">
          <button className="navbar-close-style" onClick={setToClose}><i class="fa-solid fa-xmark"></i></button>
          </div>
          <ul className="navbar-list-style">
            <li className="navbar-item-style"><a href="/">Home</a></li>
            <li className="navbar-item-style"><a href="/table">Table</a></li>
            <li className="navbar-item-style"><a href="/about">About</a></li>
            <li className="navbar-item-style"><a href="/contact">Contact</a></li>
          </ul>
        </div>)
        :
       ( <button className="navbar-toggle" onClick={setToOpen}><i class="fa-solid fa-bars"></i></button>)
      }

    </div>
  );
}
export default NavBar;