import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getData } from '../../../store/appStoreSlice';
import { useSelector } from "react-redux";

const TokenBalance = (props) => {
  const { darkTheme, gameToken, mapsNFT, creaturesNFT, towersNFT, eggsNFT } = useSelector(getData);
  const { width, name } = props;
  const useStyles = makeStyles((theme) => ({
    root: darkTheme => {
      return {
        backgroundColor: "#4B248E",
        color: "white",
        fontSize: "45px",
        width: width,
        padding: "20px",
        fontWeight: "400",
        fontFamily: "Black Han Sans, sans-serif",
        fontStyle: "normal",
        lineHeight: "56.25px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        overflowWrap: "anywhere",
        height: "244px",
        "@media (max-width: 499.98px)": {
          width: "150px",
          marginRight: "20px",
          fontSize: "25px",
          height: "150px",
          lineHeight: "30px",
        },
      }
    },
    image: {
      width: "80px",
      height: "80px",
      "@media (max-width: 499.98px)": {
        width: "60px",
        height: "60px",
      },
    }
  }));

  const classes = useStyles(darkTheme);
  const getImg = () => {
    if (name == "Creature")
      return "/img/creatures_white.png";
    if (name == "Map")
      return "/img/maps_white.png";
    if (name == "Tower")
      return "/img/towers_white.png";
    if (name == "Egg")
      return "/img/eggs_white.png";

    return "/img/token.svg";
  }

  const getTokenBalance = (name) => {
    switch(name) {
      case "GMP":  
        return gameToken;
      case "Creature":
        return creaturesNFT;
      case "Map":
        return mapsNFT;
      case "Tower":
        return towersNFT;
      case "Egg":
          return eggsNFT;
    }

    return 0;
  }

  return (
    <div className={classes.root}>
      <p>{getTokenBalance(name)} {name}</p>
      <img className={classes.image} src={getImg()}/>
    </div>
  )
}

TokenBalance.defaultProps = {
  width: "244px",
}

export default TokenBalance;