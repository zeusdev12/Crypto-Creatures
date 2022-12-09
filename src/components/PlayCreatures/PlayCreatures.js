import React, { useState } from "react";
import { withRouter } from "react-router";
import Breeds from "./Breeds/Breeds";

const PlayCreatures = (props) => {
  const [activeTab, setActiveTab] = useState('Breeds');

  const changetab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="markets container">
      <div className="mtabs">
        <a onClick={()=>changetab("Breeds")} className={ activeTab === 'Breeds' ? 'active' : ''}>
          <img className="tabimg" src="/img/creatures/dragon_blue_256.gif" width="50" height="50"/>
          <div className="overlay">Breeds</div>
        </a>
      </div>
      <div className="tabs">
        <Breeds/>
      </div>
    </div>
  );
};

export default withRouter(PlayCreatures);