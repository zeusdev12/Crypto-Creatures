import React from "react";
import RecentListCreatureItem from "./RecentListCreatureItem";
import RecentListMapItem from "./RecentListMapItem";
import RecentListTowerItem from "./RecentListTowerItem";



const RecentListBox = (props) => {
  const { data, index } = props;

  const getItems = () => {
    if (index == 0)
      return data.map((_, index) => <RecentListCreatureItem key={index} id={index}/>);
    if (index == 1)
      return data.map((_, index) => <RecentListMapItem key={index}/>);
    else
      return data.map((_, index) => <RecentListTowerItem key={index}/>);
  }

  return (
    <div role="listbox">
      { getItems() }
    </div>
  );
}

export default RecentListBox;