import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getData } from '../../store/appStoreSlice';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      backgroundColor: "transparent",
      border: darkTheme ? "1px solid #9D8FB7" : "1px solid #3a7305",
      borderRadius: "5px",
      color: "rgba(255,255,255,0.5)",
      height: "40px",
      "&::after": {
        backgroundColor: "#2C0B45",
      }
    }
  },
  select: darkTheme => {
    return {
      height: "40px",
      padding: "0 20px",
      fontFamily: "Black Han Sans, sans-serif",
      fontWeight: "400",
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "25px",
      "& $option": {
        backgroundColor: darkTheme ? "#2C0B45!important" : "green!important",
      },
    }
  },
  icon: {
    color: "white",
  }
}));

const DropDownList = (props) => {
  const { darkTheme } = useSelector(getData);
  const { data, handleChange, name, defaultValue } = props;
  const classes = useStyles(darkTheme);

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <Select
        native
        value={defaultValue}
        onChange={handleChange}
        inputProps={{
          name: name,
          id: `${name}-select`,
        }}
        classes={{select: classes.select, icon: classes.icon}}
        className={classes.root}
      >
        { data.map((item, index) => (<option key={index} value={index}>{item}</option>)) }
      </Select>
    </FormControl>
  )
}

export default DropDownList;