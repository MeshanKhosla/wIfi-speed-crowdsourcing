import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import DetermineSpeed from "./DetermineSpeed";
import GetUserLocation from "./GetUserLocation";

const GetUserInformation = ({ userData, setUserData }) => {
  const [scanStarted, setScanStarted] = useState(false);
  const [wifiTestStarted, setWifiSpeedStarted] = useState(false);

  useEffect(() => {
    if ("lat" in userData && !("dwnldSpd" in userData)) {
      setWifiSpeedStarted(true);
    }
  }, [userData]);

  return (
      <div>
      <div className={`get-user-information ${scanStarted ? 'move-to-right' : ''}`}>
        <Button className='check-speed-btn' disabled={scanStarted} onClick={() => setScanStarted(true)}>Check WiFi Speed</Button>
        {scanStarted && (
            <div>
              <GetUserLocation userData={userData} setUserData={setUserData} />
            </div>
          )}

        {wifiTestStarted && (
          <DetermineSpeed userData={userData} setUserData={setUserData} />
        )}
      </div>

        {scanStarted && (
          <iframe className='map-iframe' width="425" height="350" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
           src="https://www.openstreetmap.org/export/embed.html?bbox=-122.26675987243654%2C37.86932302984053%2C-122.25296258926393%2C37.874878800061445&amp;layer=mapnik"
           style={{"border": '1px solid black'}}></iframe>
        )}
      </div>
  );
}

export default GetUserInformation;
