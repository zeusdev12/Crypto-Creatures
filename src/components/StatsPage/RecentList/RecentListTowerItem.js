import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ItemSubInfoSellTowerRoot from "../ItemSubInfos/ItemSubInfoSellTowerRoot";
import ItemSubInfoSell from "../ItemSubInfos/ItemSubInfoSell";
import { getData } from '../../../store/appStoreSlice';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      color: darkTheme ? "rgba(255,255,255,0.5)" : "#929292",
      borderBottom: "1px solid #3a3f50",
      padding: "20px",
      "&:hover": {
        backgroundColor: 'rgba(58, 63, 80, 0.5)',
      },
      "@media (max-width: 499.98px)": {
        padding: "20px 5px",
      },
    }
  },
}));

const RecentListTowerItem = (props) => {
  const { darkTheme } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <a className={classes.root}>
      <ItemSubInfoSellTowerRoot/>
      <ItemSubInfoSell/>
    </a>
  );
}

export default RecentListTowerItem;