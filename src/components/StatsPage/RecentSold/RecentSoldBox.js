import React from "react";
import RecentSoldCreatureItem from "./RecentSoldCreatureItem";
import RecentSoldMapItem from "./RecentSoldMapItem";
import RecentSoldTowerItem from "./RecentSoldTowerItem";



const RecentSoldBox = (props) => {
  const { data, index } = props;

  const getItems = () => {
    if (index == 0)
      return data.map((_, index) => <RecentSoldCreatureItem key={index}/>);
    if (index == 1)
      return data.map((_, index) => <RecentSoldMapItem key={index}/>);
    else
      return data.map((_, index) => <RecentSoldTowerItem key={index}/>);
  }

  return (
    <div role="listbox">
      { getItems() }
    </div>
  );
}

export default RecentSoldBox;