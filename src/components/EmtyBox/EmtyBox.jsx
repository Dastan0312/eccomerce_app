import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "../../pages/FavoritesPage/FavoritesPage.module.css";

const EmtyBox = ({ title, content }) => {
  return (
    <div className={styles.emtyBox}>
      {" "}
      <div className={styles.content}>
        <h2>{title} </h2>
        <p>{content}</p>{" "}
        <Link to="/">
          {" "}
          <div className={styles.btn}>
            <p style={{ paddingLeft: "25px" }}> Вернуться назад</p>{" "}
            <HiArrowNarrowLeft className={styles.leftIcon} />{" "}
          </div>{" "}
        </Link>{" "}
      </div>{" "}
    </div>
  );
};

export default EmtyBox;
