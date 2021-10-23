import { useState } from "react";
import SpeedChart from "./SpeedChart";
// Json file containing various imgs in increasing file size
import img_links from "./img_links.json";

const NUM_TEST = 3;

// Measures connection speed using an img_obj containing a link and size
const MeasureConnectionSpeed = (img_obj, setFinalSpeed) => {
  const imageAddr = img_obj.link;
  const downloadSize = img_obj.size;
  const download = new Image();

  let startTime, endTime;
  startTime = new Date().getTime();
  let cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  download.onload = () => {
    endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = downloadSize * 8;
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);
    console.log(speedMbps);
    setFinalSpeed(speedMbps);
  };

  download.onerror = function (err, msg) {
    console.log("Invalid image, or error downloading");
  };
};

const DetermineSpeed = () => {
  const [speedVals, setSpeedVals] = useState(Array(NUM_TEST).fill(null));
  const [finalSpeed, setFinalSpeed] = useState(null);

  

  const GetDownloadSpeeds = () => {
    // Currently only use the first img link
    MeasureConnectionSpeed(img_links[0], setFinalSpeed);
    let tempSpeedVals = [...speedVals];
    tempSpeedVals[0] = finalSpeed;
    setSpeedVals(tempSpeedVals);
    
    for (let i = 0; i < NUM_TEST; i++) {
      
      
    }
  };

  return (
    <div className="determine-speed">
      <button onClick={GetDownloadSpeeds}>Start</button>
      <SpeedChart speedVals={speedVals} />
    </div>
  );
};

export default DetermineSpeed;
