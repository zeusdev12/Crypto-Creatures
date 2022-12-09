import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbView from "../../ItemThumbList/ThumbView";
import ListView from "../../ItemThumbList/ListView";
import PaginationComponent from "../../PaginationComponent/PaginationComponent";
import ViewBar from "../../Marketplace/ViewBar/ViewBar";
import { useSelector } from "react-redux";
import { useBreedingList } from "../../../utils/util";
import { getData } from '../../../store/appStoreSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
  },
}));

const Breeds = (props) => {
  const { connected } = useSelector(getData);
  const { getBreedingList, NFTSForBreeding, countBreeding } = useBreedingList();
  const [viewMode, setViewMode] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    getBreedingList();
  }, [connected])
  
  const switchViewMode = (viewMode) => {
    setViewMode(viewMode);
  } 

  return (
    <div className={classes.root}>
      <ViewBar name="Breed" switchViewMode={switchViewMode} viewMode={viewMode} totalCount={countBreeding}/>
      { viewMode == false ? <ThumbView data={NFTSForBreeding} name="Breed"/> : <ListView data={NFTSForBreeding} name="Breed"/> }
      <PaginationComponent/>
    </div>
  )
}

export default Breeds;