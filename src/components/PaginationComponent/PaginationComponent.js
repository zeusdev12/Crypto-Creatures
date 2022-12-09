import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    color: "white",
    width: "400px",
    padding: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    "@media (max-width: 499.98px)": {
      width: "380px",
    },
  },
  button_outline: darkTheme => {
    return {
      border: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
    }
  },
  button_root: {
    color: "white",
    textTransform: "initial",
    fontWeight: "initial",
    width: "60px",
    height: "40px",
    backgroundColor: "transparent",
  },
  page_region: {
    display: "flex",
    alignItems: "center",
    marginLeft: "30px",
    marginRight: "30px",
  },
  page_input: darkTheme => {
    return {
      height: "40px",
      backgroundColor: darkTheme ? "#11131b" : '#105f36',
      border: darkTheme ? "1px solid #3a3f50" : "1px solid #3a7305",
      marginLeft: "10px",
      marginRight: "10px",
    }
  },
  page_outlined_input: {
    color: "white",
    width: "20px",
  }
}));

const PaginationComponent = (props) => {
  const { darkTheme } = useSelector(getData);
  const classes = useStyles(darkTheme);

  return (
    <div className={classes.root}>
      <Button variant="outlined" classes={{outlined: classes.button_outline, root: classes.button_root}}><img src="/img/left_arrow.svg"/></Button>
      <div className={classes.page_region}>
        <p className={classes.page_title}>Page</p>
        <TextField id="outlined-basic" variant="outlined" InputProps={{classes: {input: classes.page_outlined_input, root: classes.page_input}}}/>
        <p className={classes.page_count}>of 100</p>
      </div>
      <Button variant="outlined" classes={{outlined: classes.button_outline, root: classes.button_root}}><img src="/img/right_arrow.svg"/></Button>
    </div>
  )
}

export default PaginationComponent;