import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import SellDialog from "./SellDialog/SellDialog";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getData } from '../../store/appStoreSlice';
import { getSellItem, buyItem, sellItem, getFilePathFromID, initAttrImages, getSaleIdFromToken, mintFromEgg } from "../../utils/util";
import ImagePicker from 'react-image-picker';
import { BigNumber } from 'bignumber.js';
import 'react-image-picker/dist/index.css';
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  top: {
    paddingTop: "40px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "@media (max-width: 499.98px)": {
      marginTop: "0px",
      paddingTop: "100px",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  right: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "end",
  },
  navigation: {
    display: "flex",
  },
  id: {
    marginTop: "10px",
    fontSize: "12px",
    backgroundColor: "red",
    borderRadius: "3px",
    paddingLeft: "5px",
    paddingRight: "5px",
    width: "50px",
    textAlign: "center",
  },
  title: {
    marginTop: "10px",
    fontSize: "25px",
  },
  infos: {
    display: "flex",
    flexDirection: "row",
  },
  message: {
    marginTop: "10px",
    color:"#f7ac0a",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginRight: "20px",
  },
  value: {
    color: "white",
    fontSize: "25px",
  },
  content: {
    marginTop: "50px",
    display: "flex",
    color: "white",
    justifyContent: "space-around",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
    },
  },
  detail_title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  detail_box: darkTheme => {
    return {
      border: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
      backgroundColor: darkTheme ? "rgb(33, 36, 52)" : "#19844d",
      width: "500px",
      height: "80px",
      borderRadius: "10px",
      padding: '10px',
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      "@media (max-width: 499.98px)": {
        width: "400px",
      },
    }
  },
  about_box: darkTheme => {
    return {
      border: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
      backgroundColor: darkTheme ? "rgb(33, 36, 52)" : "#19844d",
      width: "500px",
      // height: "80px",
      borderRadius: "10px",
      padding: '10px',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      "@media (max-width: 499.98px)": {
        width: "400px",
      },
    }
  },
  attribute_box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "200px",
  },
  button_outline: darkTheme => { 
    return {
      border: darkTheme ? "1px solid #6b7185" : "1px solid #3a7305",
    }
  },
  button_root: darkTheme => { 
    return {
      color: "white",
      textTransform: "initial",
      fontWeight: "initial",
      width: "80px",
      margin: "0 10px",
      backgroundColor: darkTheme ? "#242735" : "#19844d",
    }
  },
  image: {
    width: "300px!important",
    height: "300px!important",
  },
  child_image: {
    marginTop: "10px",
  },
  preview_region: {
    display: "flex",
    flexDirection: "column",
  },
  selectable_region: {
    
  },
}));

const ItemDetailPage = (props) => {
  const { NFTS, connected, accountAddress, darkTheme, creaturesAddress, eggsAddress, towersAddress, mapsAddress, creatureAttributes, towerAttributes } = useSelector(getData);
  const storename = props.match.params.store;
  const tokenId = props.match.params.tokenId;
  let id = props.match.params.id || 0;
  const classes = useStyles(darkTheme);
  const [itemDetail, setItemDetail] = useState({});
  const [message, setMessage] = useState("");
  const [openSell, SetOpenSell] = useState(false);
  const [url, setURL] = useState("");
  const [itemName, setItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [ownedItemsImage, setOwnedItemsImage] = useState([]);

  useEffect(async () => {
    loadData();
    initAttrImages();
    const { resultURL, resultName } = await getFilePathFromID(tokenId, storename == "breeds" || storename == "eggs" ? "creatures" : storename, false);
    setURL(resultURL);
    setItemName(resultName);
  }, [connected]);

  useEffect(async () => {
    const result = await Promise.all(
      NFTS.creatures
        .filter((item) => !item.isForBreeding && !item.isForSale)
        .map(async (item) => await getFilePathFromID(item.tokenId, "creatures", false))
    );
    setOwnedItemsImage(result);
  }, [NFTS]);

  const loadData = async () => {
    const tokenAddress = getTokenAddress();
    if (!id)
      id = await getSaleIdFromToken(tokenAddress, tokenId);
    let detail = await getSellItem(storename == "breeds" ? "creatures" : storename.toLowerCase(), tokenAddress, tokenId, id);
    if (storename == "eggs") {
      let url1 = await getFilePathFromID(detail?.firstId, "creatures", false);
      let url2 = await getFilePathFromID(detail?.secondId, "creatures", false);
      detail = { ...detail, firstURL: url1.resultURL, secondURL: url2.resultURL };
    }
    setItemDetail(detail);
  }

  useEffect(() => {
    checkValidation(itemDetail);
  }, [itemDetail, selectedItem])

  const checkValidation = (detail) => {
    if (!accountAddress)
      setMessage("You need to connect wallet!");
    else if (detail?.isForSale && detail?.owner == accountAddress)
      setMessage("This is yours, so you can't buy!");
    else if (detail?.isForBreeding && detail?.owner == accountAddress)
      setMessage("This is yours, so you can't breed!");
    else if (storename == "eggs" && !detail?.firstId)
      setMessage("Not exist Egg!");
    else if (detail?.isForBreeding && Object.keys(selectedItem).length == 0)
      setMessage("You need to select one your item to breed!");
    else if (!detail?.isForSale && !detail?.isForBreeding && detail?.owner != accountAddress)
      setMessage("This is not yours, so you can't sell!");
    else
      setMessage("");
  }

  const getTokenAddress = () => {
    if (storename.toLowerCase() == "creatures")
      return creaturesAddress;
    if (storename.toLowerCase() == "breeds")
      return creaturesAddress;
    if (storename.toLowerCase() == "eggs")
      return eggsAddress;
    if (storename.toLowerCase() == "maps")
      return mapsAddress;
    if (storename.toLowerCase() == "towers")
      return towersAddress;
    
    return "";
  }

  const onPick = (item) => {
    setSelectedItem(item);
  }

  const SelectableOwnedItems = useCallback(() => {
    return ( 
      <ImagePicker
        images={ownedItemsImage.map((item, i) => ({src: item.resultURL, value: NFTS.creatures[i]}))}
        onPick={onPick}
      />
    )
  }, [ownedItemsImage]);

  const Previwer = () => {
    if (storename.toLowerCase() == "maps")
      return <img src="/img/maps/m1.png" className={classes.image}/>;
    else if (url)
      // return <ModelViewer className={classes.image} filePath={getFilePathFromID(id)} scale={0.008} withAnimation={true}/>
      return <img src={url} className={classes.image}/>;
    else
      return <img className={classes.image}/>;
  }

  const getAttrImages = () => {
    if (storename.toLowerCase() == "creatures" || storename.toLowerCase() == "breeds")
      return creatureAttributes.length > 0 ? creatureAttributes[tokenId - 1] : [];
    if (storename.toLowerCase() == "towers")
      return towerAttributes.length > 0 ? towerAttributes[tokenId - 1] : [];
    
    return [];
  }

  const handleBack = () => {
    props.history.goBack();
  }

  const handleAction = async () => {
    const price = new BigNumber(itemDetail.price).multipliedBy(itemDetail.amount);
    if (storename == "eggs") {
      await mintFromEgg(itemDetail?.tokenId);
      setMessage("Not exist Egg!");
    } else if (itemDetail?.isForSale) {
      await buyItem(getTokenAddress(), id, price, false);
      setMessage("This is not in sale!");
    } else if (itemDetail?.isForBreeding) {
      await buyItem(getTokenAddress(), id, price, true, selectedItem.value.tokenId);
      setOwnedItemsImage([]);
      setMessage("This is not in sale!");
    } else {
      SetOpenSell(true);
    }
  }
  
  const handleCloseSell = () => {
    SetOpenSell(false);
  };

  const handleSell = async (price, breed) => {
    await sellItem(getTokenAddress(), tokenId, price, itemDetail.amount, breed);
    SetOpenSell(false);
    loadData();
  }

  return (<>
    { getTokenAddress() && 
      <>
      <div className="markets container">  
        <div className={classes.top}>
          <div className={classes.left}>
            <a className={classes.navigation} onClick={handleBack}>
              <img src="/img/left_direction.svg"/>
              <span>Back</span>
            </a>
            <p className={classes.id}>#{id}</p>
            <p className={classes.title}>{itemName}</p>
          </div>
          <div className={classes.right}>
            <div className={classes.details}>
              <div className={classes.infos}>
                { itemDetail?.owner && 
                  <div className={classes.data}>
                    <p className={classes.value}>Ξ {itemDetail.amount}</p>
                    <p>${(parseFloat(Web3.utils.fromWei(itemDetail.price.toString(), 'ether')) * itemDetail.amount).toFixed(5)}</p>
                  </div>}
                <Button 
                  variant="outlined" 
                  classes={{outlined: classes.button_outline, root: classes.button_root}}
                  disabled={message || !connected ? true : false}
                  onClick={handleAction}
                >
                  { storename == "eggs" ? "Mint FromEgg" : itemDetail?.isForBreeding ? "Breed Now" : itemDetail?.isForSale ? "Buy Now" : "Sell Now" }
                </Button> 
              </div>
            </div>
            <p className={classes.message}>{message}</p>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.preview_region}>
            <Previwer/>
            { itemDetail?.isForBreeding && <SelectableOwnedItems/> }
          </div>
          <div className={classes.detail}>
            <div>
              <p className={classes.detail_title}>About</p>
              <div className={classes.about_box}>
                <p>Owner: {itemDetail?.owner}</p>
                { storename == "eggs" && itemDetail?.firstId && 
                  <>
                    <img className={classes.child_image} src={itemDetail.firstURL} width="200" height="200"></img>
                    <img className={classes.child_image} src={itemDetail.secondURL} width="200" height="200"></img>
                  </>
                }
              </div>
            </div>
            <br/>
            <div>
              <p className={classes.detail_title}>Attribute</p>
              <div className={classes.detail_box}>
                {
                  getAttrImages().map((item, index) => (
                    <img key={index} src={item} width="40" height="40"></img>
                  ))
                }
              </div>
            </div>
            <br/>
            <div>
              <p className={classes.detail_title}>History</p>
              <div className={classes.detail_box}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellDialog open={openSell} handleClose={handleCloseSell} handleSell={handleSell}/>
      </>}
  </>)
}

export default withRouter(ItemDetailPage);