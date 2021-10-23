import { useState, useEffect } from "react";
import SpeedChart from "./SpeedChart";
// Json file containing various imgs in increasing file size
import img_links from "./img_links.json";

const NUM_TEST = 3;

// Measures connection speed using an img_obj containing a link and size
// TODO: set timeout
const MeasureConnectionSpeed = (img_obj, speedVals, setSpeedVals) => {
  const imageAddr = img_obj.link;
  const downloadSize = img_obj.size;
  const download = new Image();

  download.onload = () => {
    
    endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    console.log(duration);
    const bitsLoaded = downloadSize * 8;
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);
    console.log(speedMbps);
    // Update speedVals array
    console.log(speedVals);
    setSpeedVals([...speedVals, speedMbps]);
  };

  download.onerror = function (err, msg) {
    console.log("Invalid image, or error downloading");
    console.log(err);  
    setSpeedVals([...speedVals, null]);
  };

  let startTime, endTime;
  startTime = new Date().getTime();
  let cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;
};

const GetDownloadSpeed = (imgIndex, speedVals, setSpeedVals) => {
  console.log("clicked");
  // Currently only use the first img link
  MeasureConnectionSpeed(img_links[imgIndex], speedVals, setSpeedVals);
};

const DetermineSpeed = () => {
  const [speedVals, setSpeedVals] = useState([]);
  const [testCounter, setTestCounter] = useState(0);
  const [testStarted, setTestStarted] = useState(false);

  const startTest = () => {
    setTestStarted(true);
    GetDownloadSpeed(0, speedVals, setSpeedVals);
  }

  useEffect(() => {
    setTestCounter(testCounter + 1);
    if (testStarted && testCounter <= NUM_TEST) {
      // Get new value
      GetDownloadSpeed(testCounter, speedVals, setSpeedVals);
    }
  }, [speedVals])

  return (
    <div className="determine-speed">
      <button onClick={startTest}>Start</button>
      <SpeedChart speedVals={speedVals} />
    </div>
  );
};

export default DetermineSpeed;
