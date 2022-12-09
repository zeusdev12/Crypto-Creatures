import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbView from "../../ItemThumbList/ThumbView";
import ListView from "../../ItemThumbList/ListView";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import ViewBar from "../ViewBar/ViewBar";
import { useSelector } from "react-redux";
import { useSellList } from "../../../utils/util";
import { getData } from '../../../store/appStoreSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    marginLeft: "40px",
    padding: "20px",
    background: "url('/img/balance_back.png') no-repeat center",
    backgroundSize: "auto",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "initial",
    width: "100%",
    "@media (max-width: 499.98px)": {
      marginLeft: 0,
    },
  },
  blank: {
    height: "100vh",
  }
}));

const MarketplaceCreatures = (props) => {
  const { connected } = useSelector(getData);
  const { getSellList, NFTSForSale, countSale: { creaturesNFTSale } } = useSellList('creatures');
  const [viewMode, setViewMode] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    getSellList();
  }, [connected])
  
  const switchViewMode = (viewMode) => {
    setViewMode(viewMode);
  } 

  return (
    <div className={classes.root}>
      {
        NFTSForSale.creatures.length > 0
        ? <>
            <ViewBar name="Creature" switchViewMode={switchViewMode} viewMode={viewMode} totalCount={creaturesNFTSale}/>
            { viewMode == false ? <ThumbView data={NFTSForSale.creatures} name="Creature"/> : <ListView data={NFTSForSale.creatures} name="Creature"/> }
            <PaginationComponent/>
          </>
        : <div className={classes.blank}/>
      }
    </div>
  )
}

export default MarketplaceCreatures;