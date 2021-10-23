import { useState } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter'
import SpeedChart from "./SpeedChart";

const DEFAULT_DOWNLOAD_SPEED = -1;
const DetermineSpeed = () => {
  const [isSpeedLoading, setIsSpeedLoading] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(DEFAULT_DOWNLOAD_SPEED);
  const [currentSpeedTest, setCurrentSpeedTest] = useState(1);
  // const [allSpeedTestResults, setAllSpeedTestResult] = useState([])

  const handleSpeedBegin = () => setIsSpeedLoading(true);
  const handleSpeedReset = () => setDownloadSpeed(DEFAULT_DOWNLOAD_SPEED);
  const handleFinishSpeedTest = speed => {
    // allSpeedTestResults.push(speed);
    setCurrentSpeedTest(currentSpeedTest + 1);
    console.log(currentSpeedTest);
    // console.log(allSpeedTestResults);
    // setAllSpeedTestResult([...allSpeedTestResults, speed])
    if (currentSpeedTest >= 3) {
      setIsSpeedLoading(false);
    }
    // if (currentSpeedTest >= 3) {
      // setIsSpeedLoading(false);
      // return;
    // }
    // setAllSpeedTestResult([...allSpeedTestResults, speed]);
    // setCurrentSpeedTest(currentSpeedTest + 1);
    // setDownloadSpeed(speed);
  }

  const DownloadSpeedCount = () => {
    return (
        <p>Determining speeds</p>
    )
  }

  return (
      <div className="determine-speed">
        <button onClick={handleSpeedBegin}>Start</button>
        <button onClick={handleSpeedReset}>Reset</button>
        {(isSpeedLoading || downloadSpeed !== -1) &&
          <p>{downloadSpeed === DEFAULT_DOWNLOAD_SPEED ? <DownloadSpeedCount /> : downloadSpeed}</p>
        }
        {isSpeedLoading &&
          <ReactInternetSpeedMeter
              pingInterval={4000} // milliseconds
              thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
              threshold={100}
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
              downloadSize="1781287" //bytes
              callbackFunctionOnNetworkDown={speed => {}}
              callbackFunctionOnNetworkTest={speed => handleFinishSpeedTest(speed)}
          />
        }
        <SpeedChart />
      </div>
  );
}

export default DetermineSpeed;
