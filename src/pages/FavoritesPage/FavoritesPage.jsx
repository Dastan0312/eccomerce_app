import React, { useContext } from "react";
import style from "../../components/Card/Card.module.css";
import likedImg from "../../images/liked.png";
import unlikedImg from "../../images/unliked.svg";
import styles from "./FavoritesPage.module.css";
import { UserContext } from "./../../UseContext";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import EmtyBox from "../../components/EmtyBox/EmtyBox";
import { BsBackspace } from "react-icons/bs";

const FavoritesPage = () => {
  const { favorite, removeFavoriteItem } = useContext(UserContext);
  // const [liked, setLiked] = React.useState(false);

  return (
    <div className={styles.favoriteSection}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link style={{ display: "flex", alignItems: "center" }} to="/">
          <BsBackspace className={styles.backBtn} />
        </Link>
        <h2>Мои закладки</h2>
      </div>
      {favorite.length <= 0 ? (
        <EmtyBox
          title={"Закладок нет :("}
          content={"Вы ничего не добавляли в закладки"}
        />
      ) : (
        <div className={styles.container}>
          {favorite.map((el, i) => {
            return (
              <div key={i} className={style.body}>
                <div className={style.img}>
                  <div
                    onClick={() => removeFavoriteItem(el)}
                    className={style.heart}
                  >
                    <img src={likedImg} alt="" />
                  </div>
                  <img src={el.img} alt="" />
                </div>
                <p className={style.title}>{el.title}</p>
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
                    <strong> {el.price} руб.</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
