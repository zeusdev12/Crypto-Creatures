import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RecentListBox from "./RecentListBox";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
  },
  title: {
    color: "white",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "20px"
  },
  table: {
    flexGrow: 1,
    border: "1px solid #3a3f50",
    borderRadius: "5px",
    color: "white",
    width: "550px",
    height: "800px",
    "@media (max-width: 499.98px)": {
      width: "auto",
    },
  },
  header: {
    height: "auto",
    boxShadow: "initial",
    backgroundColor: "transparent",
    borderBottom: "1px solid #3a3f50",
  },
  wrapper: {
    display:"flex", 
    flexDirection: "row",
    textTransform: "initial",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
    },
  },
  tabButton: {
    [theme.breakpoints.up('sm')]: {
      minWidth: "100px",
    },
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
  }
}));
  
const Statistic = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <p className={classes.title}>Recently listed</p>
      <div className={classes.table}>
        <AppBar position="static" className={classes.header}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="simple tabs example"
            indicatorColor="primary"
            TabIndicatorProps={{style: {height:"4px"}}}>
            <Tab 
              label="Creatures" 
              icon={<img src="/img/creatures.png" style={{marginRight: "10px"}} width="40px" height="40px"/>} 
              classes={{
                wrapper: classes.wrapper, 
                root: classes.tabButton
              }} 
              {...a11yProps(0)} />
            <Tab 
              label="Maps" 
              icon={<img src="/img/maps.png" style={{marginRight: "10px"}} width="40px" height="40px"/>} 
              classes={{
                wrapper: classes.wrapper, 
                root: classes.tabButton
              }} 
              {...a11yProps(1)} />
            <Tab 
              label="Towers" 
              icon={<img src="/img/towers.png" style={{marginRight: "10px"}} width="40px" height="40px"/>} 
              classes={{
                wrapper: classes.wrapper, 
                root: classes.tabButton
              }} 
              {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <RecentListBox data={Array(5).fill(0)} index={value}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RecentListBox data={Array(3).fill(0)} index={value}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RecentListBox data={Array(4).fill(0)} index={value}/>
        </TabPanel>
      </div>
    </div>
  );
}

export default Statistic;
