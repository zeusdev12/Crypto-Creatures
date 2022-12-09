import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getData } from '../../store/appStoreSlice';
import { connect } from '../../utils/util';
import { useSelector } from "react-redux";
import Statistic from "./Statistic/Statistic";
import RecentSold from "./RecentSold/RecentSold";
import RecentList from "./RecentList/RecentList";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  recent: {
    display: "flex",
    paddingLeft: "150px",
    paddingRight: "150px",
    paddingBottom: "20px",
    justifyContent: "space-between",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
      padding: 0,
    },
  },
  root: {
    paddingTop: "30px",
    minHeight: "100vh",
    backgroundColor: "#2C0B45",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
      padding: 0,
    },
  }
}));

const StatsPage = (props) => {
  const classes = useStyles();
  const [inProcess, setInProcess] = useState('');
  const { accountAddress, dwarfAddress, dwarfABI, mainNetId, netId } =  useSelector(getData);

  const changeStatus = () => {
    if (!inProcess) {
      if ( accountAddress && netId==mainNetId ) {

      } else {
        connect();
      }
    }
  }

  return (
    <div className="markets">
      { 
        accountAddress && 
        <div className={classes.root}>
          <Statistic/> 
          <br/>
          <div className={classes.recent}>
            <RecentList/>
            <RecentSold/>
          </div>
        </div>
      }
      { 
        !accountAddress && 
        <div className={classes.root}>
          <div  className={accountAddress ? "hidden" : "troverlay" }>
            <div className="messages">
              <a className="play_now" onClick={changeStatus}>Connect Wallet</a>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default StatsPage;
