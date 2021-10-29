import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import DetermineSpeed from "./DetermineSpeed";
import GetUserLocation from "./GetUserLocation";
import IframeResizer from 'iframe-resizer-react'


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

        {/* TODO change this to be grid based styling instead of inline */}
        {scanStarted && (
          <iframe id="igraph" style={{marginLeft: '50px', transform: 'translateY(-103%)'}} scrolling="yes" seamless="seamless" src="https://plotly.com/~jas_lin1128/1.embed" height="525" width="50%"></iframe>
        )}
      </div>
  );
}

export default GetUserInformation;
