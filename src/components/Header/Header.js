import React, { useContext } from "react";
import logo from "../../images/image4.png";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import styles from "./Header.module.css";
import { UserContext } from "../../UseContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { setToggle, total, favorite, info } = useContext(UserContext);
  return (
    <div
      className={styles.container}
      style={{ borderBottom: "1px solid #EAEAEA" }}
    >
      <NavLink to="/">
        <div className={styles.logoContainer}>
          <img
            width="45"
            height="45"
            className={styles.logo}
            src={logo}
            alt="logo"
          />
          <div>
            <h4>REACT SNEAKERS</h4>
            <p style={{ color: "#9D9D9D" }}>Магазин лучших кроссовок</p>
          </div>
        </div>
      </NavLink>
      <div className={styles.userContainer}>
        <div onClick={() => setToggle(true)} className={styles.container}>
          <AiOutlineShoppingCart /> <p>{total} сом</p>
        </div>
        <div>
          <NavLink to="/favorites">
            {favorite.length <= 0 ? (
              <AiOutlineHeart />
            ) : (
              <AiOutlineHeart style={{ color: "red" }} />
            )}
          </NavLink>
        </div>
        <div>
          <NavLink to="/userpage">
            <BiUserCircle />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
