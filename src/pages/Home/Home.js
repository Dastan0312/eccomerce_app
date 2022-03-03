import React from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Sidebar from "../../components/SideBar/Sidebar";
import styles from "./Home.module.css";
import { UserContext } from "../../UseContext";
import { BASE_API } from "../../API";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import FavoritesPage from "./../FavoritesPage/FavoritesPage";
import Order from "../../components/Order/Order";
import UserPage from "../UserPage/UserPage";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const [cartItem, setCartItem] = React.useState([]);
  const [favorite, setFavorite] = React.useState([]);
  const [order, setOrder] = React.useState(false);

  // ===============================

  const total = cartItem.reduce((sum, obj) => {
    return sum + obj.price;
  }, 0);

  // ====================================

  const getProducts = async () => {
    const req = await fetch(BASE_API + "products");
    const res = await req.json();
    setProducts(res);
  };

  // ====================================
  const addCartItem = async (obj) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    const req = await fetch(BASE_API + "cartItem", options);
    const res = await req.json();
    setCartItem([...cartItem, res]);
  };

  const getCartItems = async () => {
    const req = await fetch(BASE_API + "cartItem");
    const res = await req.json();
    setCartItem(res);
  };

  const removeCart = async (item) => {
    await axios.delete(BASE_API + "cartItem" + "/" + item.id);
    setCartItem(cartItem.filter((el) => el !== item));
  };
  // ==============================

  const addFavoriteItem = async (obj) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    const req = await fetch(BASE_API + "favorites", options);
    const res = await req.json();
    setFavorite([...favorite, res]);
  };

  const getFavoriteItems = async () => {
    const req = await fetch(BASE_API + "favorites");
    const res = await req.json();
    setFavorite(res);
  };
  const removeFavoriteItem = async (item) => {
    await axios.delete(BASE_API + "favorites" + "/" + item.id);
    setFavorite(favorite.filter((el) => el !== item));
  };

  // ==========================

  React.useEffect(() => {
    getProducts();
    getCartItems();
    getFavoriteItems();
  }, []);
  return (
    <UserContext.Provider
      value={{
        removeCart,
        toggle,
        setToggle,
        cartItem,
        addCartItem,
        products,
        setCartItem,
        addFavoriteItem,
        removeFavoriteItem,
        favorite,
        setFavorite,
        cartItem,
        setCartItem,
        total,
        setOrder,
      }}
    >
      <div className={styles.wrapper}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
        {toggle ? <Sidebar /> : null}
        {order ? <Order /> : null}
      </div>
    </UserContext.Provider>
  );
};

export default Home;
