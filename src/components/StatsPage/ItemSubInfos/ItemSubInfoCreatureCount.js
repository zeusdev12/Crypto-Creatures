import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getData } from "../../../store/appStoreSlice";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  data: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "70px",
    width: "70px",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  image: {
    margin: "5px",
    width: "20px",
    height: "20px",
  },
}));

const ItemSubInfoCreatureCount = (props) => {
  const { id } = props;
  const classes = useStyles();
  const { creatureAttributes } = useSelector(getData);

  return (
    <div className={classes.root}>
      <div className={classes.data}>
        { creatureAttributes.length > 0 && creatureAttributes[id].map((item) => (
          <img className={classes.image} src={item}/>
        ))}
      </div>
    </div>
  );
}

export default ItemSubInfoCreatureCount;