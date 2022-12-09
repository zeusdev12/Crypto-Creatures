import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getData } from '../../../store/appStoreSlice';
import { shortAddress, numberWithCommas, getUSDFromETH } from '../../../utils/util';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      backgroundColor: "#4B248E",
      color: "white",
      fontSize: "15px",
      width: "650px",
      "@media (max-width: 499.98px)": {
        width: "365px",
      },
    }
  },
  content: {
    paddingTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  coin_balance: {
    marginTop: "10px",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "45px",
    lineHeight: "56.25px",
    color: "white",
  },
  usd_balance: darkTheme => { 
    return {
      color: "rgba(255,255,255,0.5)",
      fontFamily: "Black Han Sans, sans-serif",
      fontWeight: "400",
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "25px",  
    }
  },
  copylink: {
    float: "right",
    marginRight: "-10px",
  },
  button_region: {
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "-10px",
    marginRight: "-5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button_outline: darkTheme => { 
    return {
      border: "none",
    }
  },
  button_label: {
    marginBottom: "12px",
    "@media (max-width: 499.98px)": {
      marginBottom: "8px",
    }
  },
  button_root: darkTheme => { 
    return {
      color: "white",
      textTransform: "initial",
      fontWeight: "400",
      fontFamily: "Black Han Sans, sans-serif",
      fontStyle: "normal",
      width: "350px",
      height: "87px",
      fontSize: "30px",
      lineHeight: "37.5px",
      background: "url('/img/balance_button.png') no-repeat 50%",
      backgroundSize: "contain",
      textShadow: "0px 3px 0px #4C1881",
      WebkitTextStroke: "2px #5F1BA4",
      padding: 0,
      "@media (max-width: 499.98px)": {
        WebkitTextStroke: "0.5px #5F1BA4",
        fontSize: "15px",
        lineHeight: "20px",
      },
    }
  },
  address_region: darkTheme => {
    return {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: darkTheme ? "rgb(33, 36, 52)" : "#19844d",
      borderTop: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }
  },
  link_region: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40px",
  }
}));

const MainBalance = (props) => {
  const { darkTheme, accountAddress, ethbalance } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <a href="#"><img className={classes.copylink} src="/img/copy.png" width="20" height="20"/></a>
        <p className={classes.coin_balance}>{ethbalance} BNB</p>
        <p className={classes.usd_balance}>{numberWithCommas(getUSDFromETH(ethbalance))} USD</p>
        <div className={classes.button_region}>
          <Button variant="outlined" classes={{outlined: classes.button_outline, label: classes.button_label, root: classes.button_root}}>Depoist to</Button>
          <Button variant="outlined" classes={{outlined: classes.button_outline, label: classes.button_label, root: classes.button_root}}>Withdraw from</Button>
        </div>
      </div>
    </div>
  )
}

export default MainBalance;