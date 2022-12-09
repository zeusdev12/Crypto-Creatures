import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ThumbItem from "./ThumbItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    // '&::after': {
    //   content: "''",
    //   flex: "auto",
    // }
  },
}));

const ThumbView = (props) => {
  const { data, name } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      { data.map((item, index) => (<ThumbItem key={index} data={item} name={name}/>)) }
    </div>
  )
}

export default ThumbView;