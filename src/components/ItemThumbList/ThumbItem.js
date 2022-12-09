import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getFilePathFromID } from "../../utils/util";
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";
import Web3 from "web3";
import { useStateIfMounted } from "use-state-if-mounted";

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      color: "white",
      fontSize: "12px",
      width: "200px",
      backgroundColor: darkTheme ? "#09011d" : "#105f36",
      fontFamily: "Black Han Sans, sans-serif",
      fontWeight: "400",
      fontStyle: "normal",
      
    }
  },
  data: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 10px 0px 10px",
    width: "100%",
  },
  time: darkTheme => {
    return {
      color: darkTheme ? "rgba(255,255,255,0.5)" : "#929292",
    }
  },
  data_region: {
    padding: "10px 10px 0px 10px",
    width: "100%",
    fontSize: "12px",
  },
  tag: {
    backgroundColor: "transparent",
    paddingRight: "10px",
    display: "inline-block",
  },
  id: {
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
  },
  count: darkTheme => {
    return {
      marginTop: "3px",
      color: darkTheme ? "white" : "#929292",
    }
  },
  price_region: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: "20px",
    background: "linear-gradient(180deg, #4B248E 0%, #A366F0 100%)",
  },
  tower_region: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    background: "linear-gradient(180deg, #4B248E 0%, #A366F0 100%)",
  },
  price: darkTheme => {
    return {
      color: darkTheme ? "white" : "#929292",
      fontSize: "14px",
    }
  },
  location: {
    display: "flex",
    backgroundColor: "green",
    borderRadius: "3px",
    padding: "4px 10px",
    width: "fit-content",
  },
  mark: {
    color: "white",
    backgroundColor: "transparent",
    marginLeft: "-10px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    paddingLeft: "10px",
    paddingRight: "10px",
    height: "fit-content",
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
  tower_price: {
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
  tower_tag_region: darkTheme => {
    return {
      padding: "10px",
      background: "linear-gradient(180deg, #4B248E 3.12%, #4B248E 100%)",
    }
  },
  tower_tag_name: {
    marginBottom: "5px",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "12px",
    lineHeight: "15px",
  },
  tower_tag_1: {
    display: "inline-block",
    borderRadius: "5px",
    padding: "1px 10px",
    verticalAlign: "middle",
    color: "white",
    background: "url('/img/btn_green.png') no-repeat center",
    backgroundSize: "contain",
    textAlign: "center",
    width: "90px",
    paddingBottom: "8px",
    WebkitTextStroke: "2px #238800",
    textShadow: "0px 2px 0px #1C6F00",
    marginLeft: "-3px",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
  tower_tag_2: {
    marginLeft: '20px',
    display: "inline-block",
    backgroundColor: "transparent",
    padding: "1px 10px",
    verticalAlign: "middle",
    color: "#FF800B",
    marginBottom: "5px",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "25px",
  },
  image: {
    width: "80px!important",
    height: "80px!important",
    marginTop: "20px",
    marginBottom: "20px",
  }
}));

const ThumbItem = (props) => {
  const { darkTheme } = useSelector(getData);
  const { data, name } = props;
  const classes = useStyles(darkTheme);
  const history = useHistory();
  const [url, setURL] = useStateIfMounted("");
  const [itemName, setItemName] = useStateIfMounted("");

  useEffect(async () => {
    let storename = "";
    if (name == "Creature")
      storename = "creatures";
    else if (name == "Tower")
      storename = "towers"
    else if (name == "Breed")
      storename = "breeds"
    else if (name == "Egg")
      storename = "eggs"
    else
      return;

    const { resultURL, resultName } = await getFilePathFromID(data.tokenId, storename == "breeds" || storename == "eggs" ? "creatures" : storename);
    setURL(resultURL);
    setItemName(resultName);
  }, [data, name]);

  const handleClick = (store, tokenId, id) => {
    let url = `/item/${store}/${tokenId}`;
    if (id)
      url += `/${id}`;
    history.push(url);
  } 

  const creatureThumb = useCallback(() => {    
    return (
      <a onClick={() => handleClick("creatures", data.tokenId, data.id)}>
        <div className={classes.price_region}>
          <div className={classes.data_region}>
            <p className={classes.tag}>#{data.tokenId}</p>
            <p className={classes.id}><img src="/img/icon.svg"/>&nbsp;{itemName}</p>
            <p className={classes.count}>Breed count: {data.count}</p>
          </div>
          {/* <ModelViewer className={classes.image} filePath={getFilePathFromID(data.id)} scale={0.03}/> */}
          { url ? <img src={url} className={classes.image}/> : <img className={classes.image}/> }
          <p>Ξ {data.amount} <span className={classes.price}>${(parseFloat(Web3.utils.fromWei(data.price.toString(), 'ether')) * data.amount).toFixed(5)}</span></p>
        </div>
      </a>
    )
  }, [data, url, itemName]);

  const breedThumb = useCallback(() => {    
    return (
      <a onClick={() => handleClick("breeds", data.tokenId, data.id)}>
        <div className={classes.data_region}>
          <p className={classes.tag}>#{data.tokenId}</p>
          <p className={classes.id}><img src="/img/icon.svg"/>&nbsp;{itemName}</p>
          <p className={classes.count}>Breed count: {data.count}</p>
        </div>
        <div className={classes.price_region}>
          {/* <ModelViewer className={classes.image} filePath={getFilePathFromID(data.id)} scale={0.03}/> */}
          { url ? <img src={url} className={classes.image}/> : <img className={classes.image}/> }
          <p>Ξ {data.amount} <span className={classes.price}>${(parseFloat(Web3.utils.fromWei(data.price.toString(), 'ether')) * data.amount).toFixed(5)}</span></p>
        </div>
      </a>
    )
  }, [data, url, itemName]);
  
  const eggThumb = useCallback(() => {    
    return (
      <a onClick={() => handleClick("eggs", data.tokenId, data.id)}>
        <div className={classes.data_region}>
          <p className={classes.tag}>#{data.tokenId}</p>
          <p className={classes.id}><img src="/img/icon.svg"/>&nbsp;{itemName}</p>
        </div>
        <div className={classes.price_region}>
          {/* <ModelViewer className={classes.image} filePath={getFilePathFromID(data.id)} scale={0.03}/> */}
          { url ? <img src={url} className={classes.image}/> : <img className={classes.image}/> }
          <p>Ξ {data.amount} <span className={classes.price}>${(parseFloat(Web3.utils.fromWei(data.price.toString(), 'ether')) * data.amount).toFixed(5)}</span></p>
        </div>
      </a>
    )
  }, [data, url, itemName]);

  const mapThumb = useCallback(() => {
    return (
      <a onClick={() => handleClick("maps", data.tokenId, data.id)}>
        <div className={classes.data}>
          <div className={classes.data_region}>
            <div className={classes.location}>
              <img src="/img/location.svg"/>
              &nbsp;&nbsp;-93, -80
            </div>
            <p className={classes.id}>Savanah Plot</p>
            <p className={classes.count}>Hatching Station</p>
          </div>
          <p className={classes.time}>2 days ago</p>
        </div>
        <div className={classes.price_region}>
          <img src="/img/maps/m1.png" className={classes.image} width="80px" height="80px"/>
          <p>Ξ {data.amount} <span className={classes.price}>${(parseFloat(Web3.utils.fromWei(data.price.toString(), 'ether')) * data.amount).toFixed(5)}</span></p>
        </div>
      </a>
    )
  }, [data]);

  const towerThumb = useCallback(() => {
    return (
      <a onClick={() => handleClick("towers", data.tokenId, data.id)}>
        <div className={classes.tower_region}>
          <div className={classes.data}>
            <p className={classes.mark}>#{data.tokenId}</p>
            <p className={classes.tower_price}>Ξ {data.amount}</p>            
          </div>
          { url ? <img src={url} className={classes.image}/> : <img className={classes.image}/> }
        </div>
        <div className={classes.tower_tag_region}>
          <p className={classes.tower_tag_name}>{itemName}</p>
          <div>
            <p className={classes.tower_tag_1}>Forest</p>
            <p className={classes.tower_tag_2}>Epic</p>
          </div>
        </div>
      </a>
    )
  }, [data, url, itemName]);
  
  const ThumbContent = useCallback(() => {
    if (name == "Creature")
      return creatureThumb();
    if (name == "Breed")
      return breedThumb();
    if (name == "Map")
      return mapThumb();
    if (name == "Egg")
      return eggThumb();
    return towerThumb();
  }, [name, url, itemName])


  return (
    <div className={classes.root}>
      <ThumbContent/>
    </div>
  )
}

ThumbItem.defaultProps = {
  data: {
    id: "2375897",
    count: 0,
    amount: 0.063,
    price: 3126.98
  },
}

export default ThumbItem;