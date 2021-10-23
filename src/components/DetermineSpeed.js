import { useState } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter'

const DEFAULT_DOWNLOAD_SPEED = -1;
const DetermineSpeed = () => {
  const [isSpeedLoading, setIsSpeedLoading] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(DEFAULT_DOWNLOAD_SPEED);

  const handleSpeedBegin = () => setIsSpeedLoading(true);
  const handleSpeedReset = () => setDownloadSpeed(DEFAULT_DOWNLOAD_SPEED);
  const handleFinishSpeedTest = speed => {
    setDownloadSpeed(speed);
    setIsSpeedLoading(false);
  }

  return (
      <div className="determine-speed">
        <p>WiFi Speed Crowdsourcing</p>
        <button onClick={handleSpeedBegin}>Start</button>
        <button onClick={handleSpeedReset}>Reset</button>
        {(isSpeedLoading || downloadSpeed !== -1) &&
          <p>{downloadSpeed === DEFAULT_DOWNLOAD_SPEED ? "Loading" : downloadSpeed}</p>
        }
        {isSpeedLoading &&
          <ReactInternetSpeedMeter
              txtSubHeading="Checking the speed"
              outputType="empty"
              customClassName={null}
              txtMainHeading="Opps..."
              pingInterval={4000} // milliseconds
              thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
              threshold={100}
              imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
              downloadSize="1781287" //bytes
              callbackFunctionOnNetworkDown={speed => {}}
              callbackFunctionOnNetworkTest={speed => handleFinishSpeedTest(speed)}
          />
        }
      </div>
  );
}

export default DetermineSpeed;
