import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core';
import { getData } from '../../../store/appStoreSlice';

const useStyles = makeStyles((theme) => ({
  root: darkTheme => {
    return {
      backgroundColor: darkTheme ? "rgb(33, 36, 52)" : "#19844d",
      width: "500px",
      color: "white",
    }
  },
  title: {
    color: "white",
  },
  price: {
    color: "#a9a9a9!important",
  },
  button_outline: darkTheme => { 
    return {
      border: darkTheme ? "1px solid #6b7185" : "1px solid #3a7305",
    }
  },
  button_root: darkTheme => { 
    return {
      color: "white",
      textTransform: "initial",
      fontWeight: "initial",
      width: "100px",
      backgroundColor: darkTheme ? "#242735" : "#19844d",
    }
  },
  breed_check: {
    marginRight: "150px",
    "@media (max-width: 499.98px)": {
      marginRight: "10px",
    },
  }
}));

const SellDialog = (props) => {
  const { darkTheme } = useSelector(getData);
  const { open, handleClose, handleSell } = props;
  const classes = useStyles(darkTheme);
  const [price, setPrice] = useState("");
  const [breed, setBreed] = useState(false);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      classes={{paper: classes.root}}
    >
      <DialogTitle id="form-dialog-title">Sell</DialogTitle>
      <DialogContent>
        <DialogContentText classes={{root: classes.title}}>
          To sell this item, please enter the price.
        </DialogContentText>
        <TextField
          classes={{root: classes.title}}
          InputLabelProps={{classes: {root: classes.price, focused: classes.price}}}
          InputProps={{classes: {root: classes.title}}}
          autoFocus
          margin="dense"
          id="price"
          label="Price (BNB)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          error={Number(price) >= 0 ? false : true}
        />
      </DialogContent>
      <DialogActions>
        <input type="checkbox" id="for-breed" name="forBreed" onChange={(e) => setBreed(e.target.checked)}/>
        <label className={classes.breed_check} htmlFor="for-breed"> For Breed</label>
        <Button 
          variant="outlined" 
          classes={{outlined: classes.button_outline, root: classes.button_root}}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button 
          variant="outlined" 
          classes={{outlined: classes.button_outline, root: classes.button_root}}
          onClick={() => handleSell(price, breed)}
        >
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default SellDialog;