import { useState, useEffect } from 'react';
import GetUserInformation from "./components/GetUserInformation";
import MainNav from './components/MainNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import './App.css';
import SpeedSubmittedModal from "./components/SpeedSubmittedModal";
import Map from "./components/Map";

/*
  Data schema:
  data = {
    "lat": float,
    "long": float,
    "ID": {"flrID":int, "bldID":int},
    "dateTime": yyyy-mm-dd hh:mm:ss.s,
    "dwnldSpd": float,
    "upldSpd": float,
  }
 */

const allKeys = ['lat', 'long', 'ID', 'dateTime', 'dwnldSpd', 'upldSpd']
const App = () => {
  const [userData, setUserData] = useState({'ID': 3});
  const [showModal, setShowModal] = useState(false);

  const sendDataToBackend = () => {
    console.log(userData);
    setShowModal(true);
  }

  useEffect(() => {
    let incompleteData = false;
    for (const elem of allKeys) {
      if (!(elem in userData)) {
        incompleteData = true;
      }
    }
    if (!incompleteData) {
      sendDataToBackend();
    }
  }, [userData]);

  return (
      <div className="App">
        <Router>
          <MainNav />
          {/*<p>WiFi Speed Crowdsourcing</p>*/}
          <Switch>
            <Route path="/about">
              <p>About</p>
            </Route>
            <Route path="/map">
              <Map setShowModal={setShowModal} />
            </Route>
            <Route path="/">
              <GetUserInformation userData={userData} setUserData={setUserData} />
            </Route>
          </Switch>
          <SpeedSubmittedModal showModal={showModal} setShowModal={setShowModal}/>
        </Router>
      </div>


  );
}

export default App;
