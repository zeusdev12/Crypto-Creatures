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

const ItemSubInfoBuyer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.value_1}>BUYER</p>
      <p className={classes.value_2}>Gulosinho #1250598</p>
      <p className={classes.value_3}>(0xce3...81ee00)</p>
    </div>
  );
}

export default ItemSubInfoBuyer;