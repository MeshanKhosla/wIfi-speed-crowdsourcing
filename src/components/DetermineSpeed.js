import { useState, useEffect } from "react";
import NetworkSpeed from 'network-speed'; 
import SpeedChart from "./SpeedChart";

const NUM_TEST = 4;
const START_BYTE_SIZE = 10000;
const testNetworkSpeed = new NetworkSpeed();

const GetDownloadSpeed = async (byteSize, downloadSpeeds, setDownloadSpeeds) => {
  const baseUrl = 'https://eu.httpbin.org/stream-bytes/' + byteSize.toString();
  const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, byteSize);
  console.log(speed.mbps);
  setDownloadSpeeds([...downloadSpeeds, speed.mbps]);    
};

const GetUploadSpeed = async (byteSize, uploadSpeeds, setUploadSpeeds) => {
  // TODO
  // setUploadSpeeds([...uploadSpeeds, speed.mbps]);
};

const DetermineSpeed = () => {
  const [downloadSpeeds, setDownloadSpeeds] = useState([]);
  const [uploadSpeeds, setUploadSpeeds] = useState([]);

  const [testCounter, setTestCounter] = useState(0);
  const [lastByteSizeDown, setLastByteSizeDown] = useState(START_BYTE_SIZE);
  const [lastByteSizeUp, setLastByteSizeUp] = useState(START_BYTE_SIZE);
  const [testStarted, setTestStarted] = useState(false);

  const startTest = () => {
    setTestStarted(true);
    GetDownloadSpeed(lastByteSizeDown, downloadSpeeds, setDownloadSpeeds);
    GetUploadSpeed(lastByteSizeUp, uploadSpeeds, setUploadSpeeds);
  };

  useEffect(() => {
    setTestCounter(testCounter + 1);
    if (testStarted && testCounter <= NUM_TEST) {
      // Double byte size if (byte size * 8) / lastSpeed = time in sec <= 1.5
      if ((lastByteSizeDown * 8) / downloadSpeeds[downloadSpeeds.length - 1] <= 1.5) {
        setLastByteSizeDown(lastByteSizeDown * 10);
      }
      if ((lastByteSizeUp * 8) / uploadSpeeds[uploadSpeeds.length - 1] <= 1.5) {
        setLastByteSizeUp(lastByteSizeUp * 10);
      }
      console.log("TEST NUM: ", testCounter);
      console.log("BYTE SIZE", lastByteSizeDown);
      GetDownloadSpeed(lastByteSizeDown, uploadSpeeds, setDownloadSpeeds);
      GetUploadSpeed(lastByteSizeUp, uploadSpeeds, setUploadSpeeds);
    }
  }, [uploadSpeeds]);

  return (
    <div className="determine-speed">
      <button onClick={startTest}>Start</button>
      <SpeedChart downloadSpeeds={downloadSpeeds} uploadSpeeds={uploadSpeeds} />
    </div>
  );
};

export default DetermineSpeed;
