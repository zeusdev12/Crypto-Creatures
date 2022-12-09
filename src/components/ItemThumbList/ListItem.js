import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";
import { getFilePathFromID, initAttrImages } from "../../utils/util";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      border: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
      borderRadius: "5px",
      color: "white",
      fontSize: "12px",
      width: "100%",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Black Han Sans, sans-serif",
      fontWeight: "400",
      fontStyle: "normal",
    }
  },
  data_region: {
    marginBottom: "20px",
    marginTop: "auto"    ,
    marginBottom: "auto",
  },
  tag: {
    backgroundColor: "green",
    borderRadius: "3px",
    paddingLeft: "10px",
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
      color: darkTheme ? "rgba(255,255,255,0.5)" : "#929292",
    }
  },
  price_region: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    fontSize: "20px",
  },
  price: darkTheme => {
    return {
      color: darkTheme ? "rgba(255,255,255,0.5)" : "#929292",
      fontSize: "14px",
    }
  },
  image_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "70px",
    width: "70px",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  image: {
    width: "20px",
    height: "20px",
    margin: "5px",
  }
}));

const ListItem = (props) => {
  const { darkTheme, creatureAttributes } = useSelector(getData);
  const { data, name } = props;
  const classes = useStyles(darkTheme);
  const history = useHistory();
  const [url, setURL] = useState("");
  const [itemName, setItemName] = useState("");

  useEffect(async () => {
    initAttrImages();
    const { resultURL, resultName } = await getFilePathFromID(data.tokenId, "creatures");
    setURL(resultURL);
    setItemName(resultName);
  }, [data]);
  
  const handleClick = (tokenId, id) => {
    let url = `/item/creatures/${tokenId}`;
    if (id)
      url += `/${id}`;
    history.push(url);
  } 

  return (
    <a className={classes.root} onClick={() => handleClick(data.tokenId, data.id)}>
      { url ? <img src={url} width="80px" height="80px"/> : <img width="80px" height="80px"/> }
      <div className={classes.data_region}>
        <p className={classes.tag}>#{data.tokenId}</p>
        <p className={classes.id}><img src="/img/icon.svg"/>&nbsp;{itemName}</p>
        <p className={classes.count}>Breed count: {data.count}</p>
      </div>
      <div className={classes.image_container}>
        { creatureAttributes.length > 0 && creatureAttributes[data.tokenId - 1].map((item, index) => (
          <img className={classes.image} src={item} key={index}/>
        ))}
      </div>
      <div className={classes.price_region}>
        <p className={classes.value_1}>Ξ {data.amount}</p>
        <span className={classes.price}>${(data.amount * (parseFloat(Web3.utils.fromWei(data.price.toString(), 'ether')))).toFixed(5)}</span>
      </div>
    </a>
  )
}

ListItem.defaultProps = {
  data: {
    id: "2375897",
    count: 0,
    amount: 0.063,
    price: 3126.98
  },
}

export default ListItem;