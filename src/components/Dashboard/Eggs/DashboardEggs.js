import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MainBalance from "../Balances/MainBalance";
import TokenBalance from "../Balances/TokenBalance";
import NoActivities from "../Activities/NoActivities";
import ThumbView from "../../ItemThumbList/ThumbView";
import { useSelector } from "react-redux";
import { getData } from '../../../store/appStoreSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "10px",
    marginLeft: "40px",
    "@media (max-width: 499.98px)": {
      marginLeft: 0,
    },
  },
  title: {
    color: "white",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
    marginBottom: "10px",
  },
  sub_link: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
  balance_back: {
    background: "url('/img/balance_back.png') repeat center",
    backgroundSize: "contain",
    display: "flex",
    flexDirection: "column",
    padding: "50px",
    "@media (max-width: 499.98px)": {
      padding: "20px",
    },
  },
  balance_region: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
    },
  },
  token_region: {
    marginLeft: "100px",
    display: "flex",
    justifyContent: "space-between",
    width: "600px",
    "@media (max-width: 499.98px)": {
      width: "365px",
      marginLeft: "0",
      marginTop: "10px",
      justifyContent: "flex-start",
    },
  },
  token_sub_region: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 499.98px)": {
      marginTop: "10px",
    },
  },
  activities: {
    marginTop: "20px",
  },
  activities_title: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
  },
}));

const DashboardEggs = (props) => {
  const { NFTS } = useSelector(getData);
  const classes = useStyles();
  const history = useHistory();

  const viewFullItems = (storename) => {
    history.push(`/items/${storename}`);
  }

  return (
    <div className={classes.root}>
      <div className={classes.balance_back}>
        <h3 className={classes.title}>Wallets</h3>
        <div className={classes.balance_region}>
          <MainBalance/>
          <div className={classes.token_region}>
            <div className={classes.token_sub_region}>
              <TokenBalance name="Egg"/>
            </div>
            <div className={classes.token_sub_region}>
              <TokenBalance name="GMP"/>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.activities}>
        <div className={classes.activities_title}>
          <h3 className={classes.title}>Items
            <span style={{fontWeight: 100}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </h3>
          <a className={classes.sub_link} onClick={() => viewFullItems('Towers')}>{"View full Items >"}</a>
        </div>
        <ThumbView data={NFTS.eggs.slice(0, 5)} name="Egg"/>
      </div>
      <div className={classes.activities}>
        <div className={classes.activities_title}>
          <h3 className={classes.title}>Activities
            <span style={{fontWeight: 100}}>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </h3>
          <a className={classes.sub_link} href="#">{"View full activites >"}</a>
        </div>
        <NoActivities/>
      </div>
    </div>
  )
}

export default DashboardEggs;