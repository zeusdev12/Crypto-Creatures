import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: "20px",
  },
  value_1: {
    color: "white",
  },
  value_2: {
    fontSize: "10px",
  },
}));

const ItemSubInfoSell = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.data}>
        <p className={classes.value_1}>Ξ 0.12</p>
        <p>$465.59</p>
        <p className={classes.value_2}>a few seconds ago</p>
      </div>
      <img src="/img/right_direction.svg" width="15"/>
    </div>
  );
}

export default ItemSubInfoSell;