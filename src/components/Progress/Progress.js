import React, { useState } from "react";
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1000,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgb(41 41 41 / 61%)",
  },
  progress: {
    margin: "auto",
    marginTop: "calc(50vh - 125px)",
  }
}));

const Progress = (props) => {
  const classes = useStyles();
  const { inProcess } = useSelector(getData);
    
  return (
    <>
    { inProcess && 
      <div className={classes.root}>
        <img src="/img/progress.gif" className={classes.progress}/>
      </div>}
    </>
  );
}

export default Progress;
