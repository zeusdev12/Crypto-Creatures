import "./App.css";
import Header from "./components/Header/Header";
import "./fonts/Roboto/stylesheet.css";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Playgame from "./components/Playgame/Playgame";
import PlayTowers from "./components/PlayTowers/PlayTowers";
import PlayMaps from "./components/PlayMaps/PlayMaps";
import Maps from "./components/Maps/Maps";
import Testmap from "./components/Testmap/Testmap";
import Testmap2 from "./components/Testmap2/Testmap2";
import PlayCreatures from "./components/PlayCreatures/PlayCreatures";
import AboutPage from "./components/AboutPage/AboutPage";
import Marketplace from "./components/Marketplace/Marketplace";
import Slider from "./components/Slider/Slider";
import SecondSlider from "./components/SecondSlider/SecondSlider";
import StatsPage from "./components/StatsPage/StatsPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ItemDetailPage from "./components/ItemDetailPage/ItemDetailPage";
import React from "react";
import { Route } from "react-router-dom";
import { setTheme } from './utils/util';
import { getData } from './store/appStoreSlice';
import { useSelector } from "react-redux";
import Items from "./components/Items/Items";
import Footer from "./components/Footer/Footer";

const App = (props) => {
  const { darkTheme } = useSelector(getData);
  
  const toggleTheme = () => {
    setTheme(!darkTheme)
  };

    return (
    <React.Fragment>
      <Header
        toggleTheme={toggleTheme}
      />
      <Route  path="/" exact  render={() =>
        <div id="main">
          <Main darkTheme={darkTheme} />
          <About darkTheme={darkTheme} />
          <Slider darkTheme={darkTheme} />
          <SecondSlider darkTheme={darkTheme} />
        </div>
      } />
      <Route  path="/about" exact render={() =>
        <div id="main">
          <AboutPage darkTheme={darkTheme} />
        </div>
      } />
      <Route path="/marketplace/:store"  render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Marketplace />
        </div>
      } />
      <Route  path="/play-game" exact render={() =>
        <div id="main">
          <Playgame darkTheme={darkTheme} />
        </div>
      } />
      <Route  path="/towers" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <PlayTowers />
        </div>
      } />
      <Route  path="/creatures" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <PlayCreatures />
        </div>
      } />
      <Route  path="/tmaps" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Testmap />
        </div>
      } />
      <Route  path="/tmaps2" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Testmap2 />
        </div>
      } />
      <Route  path="/maps" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <PlayMaps />
        </div>
      } />
      <Route  path="/maps/:id" exact render={() =>
        <div id="main">
          <Maps />
        </div>
      } />
      <Route  path="/stats" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <StatsPage />
        </div>
      } />
      <Route  path="/dashboard" exact render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Dashboard />
        </div>
      } />
      <Route path="/dashboard/:store"  render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Dashboard />
        </div>
      } />
      <Route path="/items/:store"  render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <Items />
        </div>
      } />
      <Route path="/item/:store/:tokenId/:id?"  render={() =>
        <div id="main" className={darkTheme ? null : "lightTheme"}>
          <ItemDetailPage />
        </div>
      } />
      <Footer
        toggleTheme={toggleTheme}
      />
    </React.Fragment>
  );
}

export default App;
