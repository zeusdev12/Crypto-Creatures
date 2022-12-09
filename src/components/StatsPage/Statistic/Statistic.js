import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import StatisticItem from "./StatisticItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid #3a3f50",
    borderRadius: "5px",
    marginLeft: "150px",
    marginRight: "150px",
    color: "white",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    "@media (max-width: 499.98px)": {
      margin: 0,
    },
  },
  header: {
    height: "auto",
    backgroundColor: "transparent",
    boxShadow: "initial",
    borderBottom: "1px solid #3a3f50",
  },
  wrapper: {
    textTransform: "initial",
    fontFamily: "Black Han Sans, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
  },
  tabContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "24px 40px 24px 40px",
    "@media (max-width: 499.98px)": {
      flexDirection: "column",
      padding: "20px",
    },
  }
}));

const TabPanel = (props) => {
  const classes = useStyles();
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
        <Box p={3} className={classes.tabContent}>
          {children}
        </Box>
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
  
const Statistic = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const data = {
    day: [58023, 7743.3, 57917],
    week: [445298, 60990, 444526],
    month: [1707242, 302553.5, 1702656]
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="simple tabs example"
          indicatorColor="primary"
          TabIndicatorProps={{style: {height:"4px"}}}>
          <Tab label="Last 24h" classes={{wrapper: classes.wrapper}} {...a11yProps(0)} />
          <Tab label="7 days" classes={{wrapper: classes.wrapper}} {...a11yProps(1)} />
          <Tab label="30 days" classes={{wrapper: classes.wrapper}} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      { 
        Object.keys(data).map((key, index) => {
          return (<TabPanel value={value} index={index} key={index}>
            <StatisticItem
              filePath="/img/token.svg"
              title="TOTAL SALE"
              value={data[key][0]}
            />
            <StatisticItem
              filePath="/img/token.svg"
              title="TOTAL VOLUME"
              isTVol={true}
              value={data[key][1]}
            />
            <StatisticItem
              filePath="/img/creatures.png"
              title="Creature SOLD"
              value={data[key][2]}
            />
          </TabPanel>)
        })
      }
    </div>
  );
}

export default Statistic;
