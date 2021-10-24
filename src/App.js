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
import About from "./components/About";
import axios from 'axios'

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

  // const myData =  {
  //   "lat": 33,
  //       "long": 44,
  //       "flrID":5,
  //       "bldID":3,
  //       "dateTime": "2021-10-24 12:38:47.499",
  //       "wifiName": "yahoo",
  //       "dwnldSpd": 45,
  //       "upldSpd": 19.39,
  //       "outage": "false"
  // }
  useEffect(() => {
    // axios.post('https://wifi-crowdsourcing-apim.azure-api.net/cockroachInserter/db_insert', myData, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Accept': '*/*',
    //   }
    // })
    // .then(response => console.log(response))
    // .catch(err => console.log(err));
    // fetch("https://wifi-crowdsourcing-apim.azure-api.net/betterDataParser/db_insert")
    //     .then(res => res.json())
    //     .catch(err => console.log(err))
  }, [])

  const sendDataToBackend = () => {
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
              <About />
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
