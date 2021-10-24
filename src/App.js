import { useState, useEffect } from 'react';
import DetermineSpeed from "./components/DetermineSpeed";
import GetUserLocation from "./components/GetUserLocation";
import GetUserInformation from "./components/GetUserInformation";

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
  const [userData, setUserData] = useState({});

  const sendDataToBackend = () => {
    console.log(userData);
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
        <p>WiFi Speed Crowdsourcing</p>
        <GetUserInformation userData={userData} setUserData={setUserData} />
      </div>
  );
}

export default App;
