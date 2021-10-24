import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import DetermineSpeed from "./DetermineSpeed";
import GetUserLocation from "./GetUserLocation";

const GetUserInformation = ({ userData, setUserData }) => {
  const [scanStarted, setScanStarted] = useState(false);
  const [wifiTestStarted, setWifiSpeedStarted] = useState(false);
  const [gotWifi, setGotWifi] = useState(false);

  useEffect(() => {
    if ("lat" in userData) {
      setWifiSpeedStarted(true);
    }
  }, [userData]);

  return (
      <div className="get-user-information">
        <Button onClick={() => setScanStarted(true)}>Check WiFi Speed</Button>
        {scanStarted && (
          <GetUserLocation userData={userData} setUserData={setUserData} />
        )}

        {wifiTestStarted && (
          <DetermineSpeed userData={userData} setUserData={setUserData} />
        )}
      </div>
  );
}

export default GetUserInformation;
