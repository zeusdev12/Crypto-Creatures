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
  title: {
    display: "flex",
    fontSize: "12px",
    backgroundColor: "green",
    borderRadius: "3px",
    padding: "4px 10px",
    color: "white",
  },
  value: darkTheme => {
    return {
      fontSize: "12px",
      color: darkTheme ? "#3a3f50" : "#929292",
    }
  },
  image: {
    marginRight: "10px"
  },
}));

const ItemSubInfoSellMapRoot = (props) => {
  const { darkTheme } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <div className={classes.root}>
      <img src="/img/maps/m1.png" className={classes.image} width="80px" height="80px"/>
      <div className={classes.data}>
        <p className={classes.title}>
          <img src="/img/location.svg"/>
          &nbsp;&nbsp;-93, -80
        </p>
        <p className={classes.value}>Forest plot</p>
      </div>
    </div>
  );
}

export default ItemSubInfoSellMapRoot;