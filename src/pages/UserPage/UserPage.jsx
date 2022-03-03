import React from "react";
import styles from "./UserPage.module.css";
import style from "../../components/Card/Card.module.css";
import { BASE_API } from "../../API";
import { Button } from "@mui/material";
import { BsBackspace } from "react-icons/bs";
import EmtyBox from "../../components/EmtyBox/EmtyBox";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [info, setInfo] = React.useState([]);

  const getUserInfo = async () => {
    const req = await fetch(BASE_API + "orders");
    const res = await req.json();
    setInfo(res);
  };
  const clearOrder = async (obj) => {
    await fetch(BASE_API + "orders/" + obj.id, { method: "DELETE" });
    setInfo(info.filter((el) => el !== obj));
    alert("Ваши покупки успешно отменены ");
  };
  const loading = () => {
    return (
      <div className={styles.loading}>
        {" "}
        <img src={loading} alt="" />{" "}
      </div>
    );
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={styles.userPage}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link style={{ display: "flex", alignItems: "center" }} to="/">
          <BsBackspace className={styles.backBtn} />
        </Link>
        <h2>Мои покупки</h2>
      </div>
      {info.length == 0 ? (
        <EmtyBox
          title={"У вас нет покупки"}
          content={"Оформите хотя бы один заказ."}
        />
      ) : (
        <div>
          {" "}
          {info.map((el, i) => {
            return (
              <div key={i}>
                <div className={styles.infoTitle}>
                  <h4>
                    {" "}
                    Покупка # {el.id} Сумма покупки составила {el.total} сом{" "}
                  </h4>
                  <Button
                    onClick={() => clearOrder(el)}
                    className={styles.btn}
                    size="small"
                    color="error"
                    variant="outlined"
                  >
                    Отменить покупки
                  </Button>
                </div>
                <div className={styles.cardBox}>
                  {el.items.map((item, i) => {
                    return (
                      <div key={i} className={style.body}>
                        <div className={style.img}>
                          <img src={item.img} alt="" />
                        </div>
                        <p className={style.title}>{item.title}</p>
                        <div className={style.priceContainer}>
                          <div>
                            <p
                              style={{
                                color: "#BDBDBD",
                                textTransform: "uppercase",
                                fontSize: "14px",
                              }}
                            >
                              Цена:
                            </p>
                            <strong> {item.price} сом </strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserPage;
