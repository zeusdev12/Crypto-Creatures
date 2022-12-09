import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "150px",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
}));

const NoActivities = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="/img/empty-activities.png"></img>
      <p>No Activities</p>
    </div>
  )
}

export default NoActivities;