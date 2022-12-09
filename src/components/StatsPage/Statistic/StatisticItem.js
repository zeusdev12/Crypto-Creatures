import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { numberWithCommas, priceFormatter } from "../../../utils/util"
import { Canvas } from "@react-three/fiber";
import _ from 'lodash';
import { OrbitControls, useAnimations, useFBX } from "@react-three/drei";
import ModelViewer from "../../ModelViewer/ModelViewer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "60px"
  },
  title: {
    fontSize: "12px"
  },
  value: {
    fontSize: "30px"
  },
  priceValue: {
    fontSize: "18px",
    marginLeft: "10px"
  },
  image: {
    marginRight: "20px",
    width: "80px",
    height: "80px",
  }
}));

const StatisticItem = (props) => {
  const classes = useStyles();
  const { filePath, title, value, isTVol} = props;  
    
  const getPriceValue = (value) => {
    return (<>Ξ {numberWithCommas(value)}<span className={classes.priceValue}>{priceFormatter(value * 3175.6)}</span></>)
  }

  return (
    <div className={classes.root}>
      {/* <ModelViewer className={classes.image} filePath={filePath} scale={0.005} withAnimation={true}/> */}
      <img src={filePath} className={classes.image}/>
      <div className={classes.data}>
        <p className={classes.title}>{title}</p>
        <strong className={classes.value}>{ isTVol ? getPriceValue(value) : numberWithCommas(value) }</strong>
      </div>
    </div>
  );
}

StatisticItem.defaultProps = {
  isTVol: false
};

export default StatisticItem;
