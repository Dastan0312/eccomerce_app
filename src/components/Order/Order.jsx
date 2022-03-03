import React, { useContext } from "react";
import { UserContext } from "../../UseContext";
import Cart from "../Cart/Cart";
import styles from "./Order.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { BASE_API } from "../../API";

const Order = () => {
  const { cartItem, total, setOrder, setCartItem } = useContext(UserContext);

  const [orderInfo, setOrderInfo] = React.useState({
    name: null,
    number: null,
    adress: null,
    total,
    items: cartItem,
  });
  const sendUserInfo = async (obj) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };
      const req = await fetch(BASE_API + "orders", options);
      const res = await req.json();
      alert(`Ваш заказ #${res.id} скоро будет передан курьерской доставке`);
    } catch (error) {
      console.log(error);
    }
  };
  const clearCartItem = async (cartItem) => {
    await cartItem.forEach((item) => {
      return fetch(BASE_API + "cartItem/" + item.id, { method: "DELETE" });
    });
    setCartItem([]);
  };

  return (
    <>
      {cartItem.length <= 0 ? (
        setOrder(false)
      ) : (
        <div className={styles.overlay}>
          <div className={styles.container}>
            <div className={styles.titleBox}>
              <h2 className={styles.title}>Оформить заказ </h2>
              <div>
                <Button
                  className={styles.titleBtn}
                  onClick={() => setOrder(false)}
                  variant="outlined"
                  color="error"
                >
                  Отменить заказ
                </Button>
              </div>
            </div>
            <div className={styles.orderBox}>
              <div className={styles.orderInfo}>
                {cartItem.map((el) => {
                  return <Cart key={el.id} item={el} />;
                })}
              </div>
              <div className={styles.orderForm}>
                <div className={styles.flex}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      onChange={(e) => {
                        let name = e.target.value;
                        return setOrderInfo({ ...orderInfo, name: name });
                      }}
                      fullWidth
                      id="outlined-basic"
                      label="Имя Фамилия"
                      variant="outlined"
                      style={{ margin: "10px 0" }}
                      required
                    />
                    <TextField
                      onChange={(e) => {
                        let number = e.target.value;
                        return setOrderInfo({ ...orderInfo, number: number });
                      }}
                      fullWidth
                      id="outlined-basic"
                      label="Номер телефона"
                      variant="outlined"
                      style={{ margin: "10px 0" }}
                      required
                    />
                    <TextField
                      onChange={(e) => {
                        let adress = e.target.value;
                        return setOrderInfo({ ...orderInfo, adress: adress });
                      }}
                      fullWidth
                      id="outlined-basic"
                      label="Адресс"
                      variant="outlined"
                      style={{ margin: "10px 0" }}
                      required
                    />
                  </Box>
                  <div className={styles.sumItems}>
                    <h4>Итоговый счет</h4>
                    <strong>{total} сом</strong>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    sendUserInfo(orderInfo);
                    clearCartItem(cartItem);
                  }}
                  variant="outlined"
                >
                  Отправить заказ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
