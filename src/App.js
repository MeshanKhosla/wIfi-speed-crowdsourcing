import { useState, useEffect } from 'react';
import DetermineSpeed from "./components/DetermineSpeed";
import GetUserLocation from "./components/GetUserLocation";

/*
  Data schema:
  data = {
    "lat": float,
    "long": float,
    "ID": {"flrID":int, "bldID":int},
    "dateTime": yyyy-mm-dd hh:mm:ss.s,
    "ntwrkData": {"wifiName": str, "dwnldSpd": float, "upldSpd":float, "outage": bool}
  }
 */

const allKeys = ['lat', 'long', 'ID', 'dateTime', 'ntwrkData']
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
        <DetermineSpeed />
        <GetUserLocation userData={userData} setUserData={setUserData} />
      </div>
  );
}

export default App;
