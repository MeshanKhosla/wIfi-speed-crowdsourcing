import { useState, useEffect } from 'react';
import GetUserInformation from "./components/GetUserInformation";
import MainNav from './components/MainNav';
import SpeedSubmittedModal from "./components/SpeedSubmittedModal";
import About from "./components/About";
import { apiKey } from './apiKey.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import './App.css';

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

  const myData =  {
    "lat": 33,
    "long": 44,
    "flrID": 5,
    "bldID": 3,
    "dateTime": "2021-10-24 12:38:47.499",
    "wifiName": "omg it works",
    "dwnldSpd": 45,
    "upldSpd": 19.39,
    "outage": "false"
  }

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Accept': '*/*',
      'Ocp-Apim-Subscription-Key': apiKey,
      'Ocp-Apim-Trace': true,
    }
  }

  const sendDataToBackend = () => {
    axios.post('https://db-interface-apis.azure-api.net/db-interface-app/cockroach_inserter', myData, config)
        .then(res => console.log('Res', res))
        .catch(err => console.log('Err', err));
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
