import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbView from "../../ItemThumbList/ThumbView";
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

const MarketplaceMaps = (props) => {
  const { connected, mapsAddress } = useSelector(getData);
  const { getSellList, NFTSForSale, countSale: { mapsNFTSale } } = useSellList('maps');
  const classes = useStyles();

  useEffect(() => {
    getSellList();
  }, [connected])

  return (
    <div className={classes.root}>
      {
        NFTSForSale.maps.length > 0
        ? <>
            <ViewBar name="Map" totalCount={mapsNFTSale}/>
            <ThumbView data={NFTSForSale.maps} name="Map"/>
            <PaginationComponent/>
          </>
        : <div className={classes.blank}/>
      }
    </div>
  )
}

export default MarketplaceMaps;