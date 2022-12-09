import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbView from "../../ItemThumbList/ThumbView";
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

const ItemsTowers = (props) => {
  const { NFTS } = useSelector(getData);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        NFTS.towers.length > 0
        ? <>
            <ViewBar name="Tower" totalCount={NFTS.towers.length}/>
            <ThumbView data={NFTS.towers} name="Tower"/>
            <PaginationComponent/>
          </>
        : <div className={classes.blank}/>
      }
    </div>
  )
}

export default ItemsTowers;