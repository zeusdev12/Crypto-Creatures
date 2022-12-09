import React from "react";
import { withRouter } from "react-router-dom";
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      height: "159px",
      background: "#1B1523",
      display: "flex",
      padding: "10px 20px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      opacity: "0.5",
      fontSize: "20px",
      lineHeight: "25px",
      textAlign: "center",
      fontFamily: "Black Han Sans, sans-serif",
      fontStyle: "normal",
      fontWeight: "400",
    }
  },
  link: {
    color: "white",
  },
}));

const Footer = (props) => {
  const {darkTheme} = useSelector(getData);
  const classes = useStyles(darkTheme);
  
  return (
    <div className={classes.root}>
      <form>
        <p>Contact us</p>
        <a className={classes.link} href="mailto:info@cryptocreatures.org?subject=Contact to cryptocreatures.org">info@cryptocreatures.org</a>
      </form>
    </div>
  );
}

export default withRouter(Footer);
