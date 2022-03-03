import React, { useContext } from "react";
import styles from "./Cart.module.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { UserContext } from "../../UseContext";

const Cart = ({ item }) => {
  const { removeCart, handleTotalPrice } = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img width={80} src={item.img} alt=" Cart image" />
        <div className={styles.content}>
          <p>{item.title}</p>
          <strong>{item.price} руб.</strong>
        </div>
        <div
          onClick={() => {
            removeCart(item);
          }}
          className={styles.btn}
        >
          <FaRegTimesCircle size={20} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
