import { useState, useEffect } from "react";
import SpeedChart from "./SpeedChart";
// Json file containing various imgs in increasing file size
// TODO: json doesn't need size
import img_links from "./img_links.json";

const NUM_TEST = 3;

// Measures connection speed using an img_obj containing a link and size
// TODO: set timeout
const MeasureConnectionSpeed = (img_obj, speedVals, setSpeedVals) => {
  let cacheBuster = "?nnn=" + Math.random();
  const imageAddr = img_obj.link + cacheBuster;
  const download = new Image();

  download.onload = () => {
    const resources = performance.getEntriesByType("resource");
    // TODO: try catch
    const currImg = resources.filter(elem => elem.name === imageAddr)[0];
    const durationInSec = (currImg.responseEnd - currImg.startTime) / 1000;
    const sizeInMb = (currImg.transferSize || img_obj.size) * 8 * 1e-6;
    const speedInMbps = sizeInMb / durationInSec;
    console.log(currImg);
    console.log(durationInSec);
    console.log(sizeInMb);
    setSpeedVals([...speedVals, speedInMbps]);
  };

  download.onerror = function (err, msg) {
    console.log("Invalid image, or error downloading");
    console.log(err);  
    setSpeedVals([...speedVals, null]);
  };

  download.src = imageAddr;
};

const GetDownloadSpeed = (imgIndex, speedVals, setSpeedVals) => {
  console.log("clicked");
  console.log(imgIndex);
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
