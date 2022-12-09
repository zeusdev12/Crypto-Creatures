import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getData } from '../../../store/appStoreSlice';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "45px"
  },
  title_1: {
    display: "inline-block",
    fontSize: "12px",
    backgroundColor: "green",
    borderRadius: "5px",
    padding: "1px 10px",
    lineHeight: "20px",
    verticalAlign: "middle",
    color: "white",
  },
  title_2: {
    marginLeft: '10px',
    display: "inline-block",
    fontSize: "12px",
    backgroundColor: "transparent",
    borderRadius: "5px",
    padding: "1px 10px",
    verticalAlign: "middle",
    color: "coral",
    border: "1px solid coral",
  },
  value: darkTheme => {
    return {
      fontSize: "12px",
      color: darkTheme ? "rgba(255,255,255,0.5)" : "#929292",
    }
  },
  image: {
    marginRight: "10px"
  },
}));

const ItemSubInfoSellTowerRoot = (props) => {
  const { darkTheme } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <div className={classes.root}>
      <img src="/img/towers/tower_crystal3_256.gif" className={classes.image} width="80px" height="80px"/>
      <div className={classes.data}>
        <div>
          <p className={classes.title_1}>Forest</p>
          <p className={classes.title_2}>Epic</p>
        </div>
        <p className={classes.value}>Ganbaru CrypTon #81</p>
      </div>
    </div>
  );
}

export default ItemSubInfoSellTowerRoot;