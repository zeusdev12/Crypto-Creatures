import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontSize: "12px",
  },
  value_1: {
    fontWeight: "bold",
  },
  value_2: {
    color: "white",
  },
  value_3: {
    fontSize: "10px",
  },
}));

const ItemSubInfoSeller = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.value_1}>SELLER</p>
      <p className={classes.value_2}>Mr.Goodkat</p>
      <p className={classes.value_3}>(0xa28...9bb99b)</p>
    </div>
  );
}

export default ItemSubInfoSeller;