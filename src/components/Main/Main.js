import React, { useContext } from "react";
import styles from "./Main.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../Card/Card";
import { UserContext } from "../../UseContext";
import loading from "../../images/loading.svg";

const Main = () => {
  const { products, cartItem, favorite } = useContext(UserContext);
  return (
    <>
      {products.length <= 0 ? (
        <div className={styles.loading}>
          {" "}
          <img src={loading} alt="" />{" "}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Все кроссовки</h3>
            <div className={styles.search}>
              <AiOutlineSearch className={styles.searchIcon} />
              <input type="text" placeholder="Поиск..." />
            </div>
          </div>
          <div className={styles.cards}>
            {products.map((el, i) => {
              const addClick = () =>
                cartItem.some((item) => Number(item.id) === Number(el.id));
              const addFavorite = () =>
                favorite.some((item) => Number(item.id) === Number(el.id));

              return (
                <Card
                  key={i}
                  item={el}
                  addClick={addClick}
                  addFavorite={addFavorite}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
