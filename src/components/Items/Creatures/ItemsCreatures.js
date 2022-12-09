import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbView from "../../ItemThumbList/ThumbView";
import ListView from "../../ItemThumbList/ListView";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import ViewBar from "../ViewBar/ViewBar";
import { useSelector } from "react-redux";
import { getData } from '../../../store/appStoreSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    marginLeft: "40px",
    padding: "20px",
    background: "url('/img/balance_back.png') repeat center",
    backgroundSize: "auto",
    backgroundRepeatY: "no-repeat",
    backgroundPosition: "initial",
    width: "100%",
  },
  blank: {
    height: "100vh",
  }
}));

const ItemsCreatures = (props) => {
  const { NFTS } = useSelector(getData);
  const [viewMode, setViewMode] = useState(false);
  const classes = useStyles();
  
  const switchViewMode = (viewMode) => {
    setViewMode(viewMode);
  }

  return (
    <div className={classes.root}>
      {
        NFTS.creatures.length > 0
        ? <>
            <ViewBar name="Creature" switchViewMode={switchViewMode} viewMode={viewMode} totalCount={NFTS.creatures.length}/>
            { viewMode == false ? <ThumbView data={NFTS.creatures} name="Creature"/> : <ListView data={NFTS.creatures} name="Creature"/> }
            <PaginationComponent/>
          </>
        : <div className={classes.blank}/>
      }
    </div>
  )
}

export default ItemsCreatures;