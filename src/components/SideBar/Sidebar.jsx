import React, { useContext } from "react";
import Cart from "../Cart/Cart";
import styles from "./SideBar.module.css";
import { HiArrowNarrowRight, HiArrowNarrowLeft } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import box from "../../images/emtyBox.png";
import { UserContext } from "../../UseContext";

const Sidebar = () => {
  const { cartItem, setToggle, total, setOrder } = useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}></div>
      <div className={styles.sidebar}>
        <div className={styles.title}>
          <h3>Корзина</h3> <FaTimes onClick={() => setToggle(false)} />
        </div>

        {cartItem.length <= 0 ? (
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className={styles.emtyCart}>
              <img src={box} alt="emty box" />
              <h3>Корзина пустая</h3>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <div onClick={() => setToggle(false)} className={styles.btn}>
                {" "}
                <p style={{ paddingLeft: "25px" }}> Вернуться назад</p>{" "}
                <HiArrowNarrowLeft className={styles.leftIcon} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {/* kkkkkkkkkkkkkkkkkkkkkkkkkk */}
            {cartItem.map((item, i) => {
              return <Cart key={i} item={item} />;
            })}
            {/* kkkkkkkkkkkkkkkk */}
            <div className={styles.busket}>
              <div>
                <p>Итого: </p>
                <div className={styles.dushed}></div>
                <p>{total} сом </p>
              </div>
              <div>
                <p>Налог 5%: </p>
                <div className={styles.dushed}></div>
                <p>{(total * 5) / 100} сом </p>
              </div>
              <div onClick={() => setToggle(false)} className={styles.btn}>
                {" "}
                <div>
                  <p style={{ paddingLeft: "25px" }}> Продолжить покупку</p>
                </div>{" "}
                <div>
                  <HiArrowNarrowLeft className={styles.leftIcon} />
                </div>
              </div>
              <div onClick={() => setOrder(true)} className={styles.btn}>
                {" "}
                <p>Оформить заказ</p>{" "}
                <HiArrowNarrowRight className={styles.rightIcon} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
