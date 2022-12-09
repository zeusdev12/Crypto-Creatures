import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ListItem from "./ListItem";

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

const ListView = (props) => {
  const { data, name } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      { data.map((item, index) => (<ListItem key={index} data={item} name={name}/>)) }
    </div>
  )
}

export default ListView;