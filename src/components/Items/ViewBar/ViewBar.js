import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DropDownList from "../../DropDownList/DropDownList";
import Button from '@material-ui/core/Button';

const Sale_Option = (name) => {
  if (name == "Creature")
    return ["All", "For sale", "Not for sale"];
  return ["All", "For sale"];
};
const Price_Option = (name) => {
  if (name == "Map")
    return ["Highest Price", "Lowest Price", "Latest"];
  return ["Lowest ID", "Highest ID", "Lowest Price", "Highest Price", "Latest"];  
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  left_region: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  total_count: {
    fontSize: "25px",
    color: "white",
    marginRight: "10px",
  },
  right_region: {
    display: "flex",
    justifyContent: "flex-end",
  },
  thumb_outline: props => ({
    border: props.viewMode == false ? "1px solid #ABDC2F" : "1px solid #9D8FB7",
  }),
  list_outline: props => ({
    border: props.viewMode == true ? "1px solid #ABDC2F" : "1px solid #9D8FB7",
  }),
  button_root: {
    color: "white",
    textTransform: "initial",
    fontWeight: "initial",
    width: "40px",
    height: "40px",
    backgroundColor: "transparent",
    padding: "10px",
    minWidth: "40px",
  },
  layout_button: {
    marginLeft: "10px",
  },
}));

const ViewBar = (props) => {
  const { name, switchViewMode, viewMode, totalCount } = props;
  const classes = useStyles({viewMode});
  const handleSale = (e) => {};
  const handlePrice = (e) => {};
  
  return (
    <div className={classes.root}>
      <div className={classes.left_region}>
        <p className={classes.total_count}>{totalCount} {name}s</p>
        <DropDownList data={Sale_Option(name)} handleChange={handleSale} name="sale" defaultValue={1}/>
      </div>      
      <div className={classes.right_region}>
        <DropDownList data={Price_Option(name)} handleChange={handlePrice} name="price" defaultValue={2}/>
        { name == "Creature" && 
          <div className={classes.layout_button}>
            <Button 
              variant="outlined" 
              classes={{
                outlined: classes.thumb_outline, 
                root: classes.button_root
              }}
              onClick={() => switchViewMode(false)}
            >
              <img src="/img/thumb.svg"/>
            </Button>
            <Button 
              variant="outlined" 
              classes={{
                outlined: classes.list_outline, 
                root: classes.button_root
              }}
              onClick={() => switchViewMode(true)}
            >
              <img src="/img/list.svg"/>
            </Button>
          </div>
        }
      </div>
    </div>
  )
}

export default ViewBar;