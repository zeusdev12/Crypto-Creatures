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
    height: "40px"
  },
  title: {
    display: "flex",
    fontSize: "12px",
    backgroundColor: "red",
    borderRadius: "3px",
    paddingLeft: "5px",
    paddingRight: "5px",
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

const ItemSubInfoCreatureRoot = (props) => {
  const { darkTheme } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <div className={classes.root}>
      <img src="/img/creatures/dragon_blue_256.png" className={classes.image} width="80px" height="80px"/>
      <div className={classes.data}>
        <p className={classes.title}>
          <img src="/img/icon.svg"/>
          &nbsp;#4454888
        </p>
        <p className={classes.value}>Breed count: 5</p>
      </div>
    </div>
  );
}

export default ItemSubInfoCreatureRoot;