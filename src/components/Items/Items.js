import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import ItemsCreatures from "./Creatures/ItemsCreatures";
import ItemsEggs from "./Eggs/ItemsEggs";
import ItemsMaps from "./Maps/ItemsMaps";
import ItemsTowers from "./Towers/ItemsTowers";

const Items = (props) => {
  const storename = props.match.params.store;
  const [activeTab, setActiveTab] = useState('Towers');

  useEffect(() => {
    if (storename) {
      if (storename == 'Towers') setActiveTab('Towers');
      if (storename == 'Creatures') setActiveTab('Creatures');
      if (storename == 'Maps') setActiveTab('Maps');
      if (storename == 'Eggs') setActiveTab('Eggs');
    }
  }, []);
  
  const changetab = (tab) => {
    setActiveTab(tab);
    props.history.replace({ pathname: `/items/${tab}`});
  };

  const renderCreatures = () => (<ItemsCreatures/>);
  
  const renderTowers = () => (<ItemsTowers/>);

  const renderMaps = () => (<ItemsMaps/>);

  const renderEggs = () => (<ItemsEggs/>);

  return (
    <div className="markets container">
      <div className="mtabs">
        <a onClick={() => changetab("Towers")} className={ activeTab === 'Towers' ? 'active' : ''}>
          {
            activeTab === 'Towers' 
            ? <img className="tabimg" src="/img/towers_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/towers.png" width="50" height="50"/>
          }
          <div className="overlay">Towers</div>
        </a>
        <a onClick={() => changetab("Creatures")} className={ activeTab === 'Creatures' ? 'active' : ''}>
          {
            activeTab === 'Creatures' 
            ? <img className="tabimg" src="/img/creatures_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/creatures.png" width="50" height="50"/>
          }
          <div className="overlay">Creatures</div>
        </a>
        <a onClick={() => changetab("Maps")} className={ activeTab === 'Maps' ? 'active' : ''}>
          {
            activeTab === 'Maps' 
            ? <img className="tabimg" src="/img/maps_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/maps.png" width="50" height="50"/>
          }
          <div className="overlay">Maps</div>
        </a>
        <a onClick={() => changetab("Eggs")} className={ activeTab === 'Eggs' ? 'active' : ''}>
          {
            activeTab === 'Eggs' 
            ? <img className="tabimg" src="/img/eggs_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/eggs.png" width="50" height="50"/>
          }
          <div className="overlay">Eggs</div>
        </a>
      </div>
      <div className="tabs">
        { activeTab === 'Towers' && renderTowers() }
        { activeTab === 'Creatures' && renderCreatures() }
        { activeTab === 'Maps' && renderMaps() }
        { activeTab === 'Eggs' && renderEggs() }
      </div>
    </div>
  );
}



export default withRouter(Items);
