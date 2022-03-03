import React, { useContext } from "react";
import style from "./Card.module.css";
import addBtn from "../../images/addbtn.svg";
import clickBtn from "../../images/selected.svg";
import likedImg from "../../images/liked.png";
import unlikedImg from "../../images/unliked.svg";
import { UserContext } from "../../UseContext";
import { BASE_API } from "./../../API/index";

const Card = ({ item, addClick, addFavorite }) => {
  const {
    addCartItem,
    favorite,
    setFavorite,
    cartItem,
    setCartItem,
    addFavoriteItem,
  } = useContext(UserContext);

  const [isAdded, setIsAdded] = React.useState(addClick);
  const [isLiked, setIsLiked] = React.useState(addFavorite);

  const handleAddClick = async (obj) => {
    if (!isAdded) {
      setIsAdded(true);
      await addCartItem(obj);
    } else {
      const item = cartItem.find((el) => Number(el.id) === Number(obj.id));
      await fetch(BASE_API + "cartItem/" + item.id, { method: "DELETE" });
      setCartItem(cartItem.filter((el) => el == obj));
      setIsAdded(false);
    }
  };
  const handleLikedClick = async (obj) => {
    if (!isLiked) {
      setIsLiked(true);
      await addFavoriteItem(obj);
    } else {
      const item = favorite.find((el) => Number(el.id) === Number(obj.id));
      await fetch(BASE_API + "favorites/" + item.id, { method: "DELETE" });
      setFavorite(favorite.filter((el) => el == obj));
      setIsLiked(false);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.img}>
        <div
          onClick={() => {
            handleLikedClick(item);
          }}
          className={style.heart}
        >
          <img src={isLiked ? likedImg : unlikedImg} alt="" />
        </div>
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
        <div
          className={style.btn}
          onClick={() => {
            handleAddClick(item);
          }}
        >
          <img src={isAdded ? clickBtn : addBtn} alt=" add button" />
        </div>
      </div>
    </div>
  );
};

export default Card;
