import { useState, useEffect } from "react";
import { getSpeeds } from '../measureSpeeds.js';

const DEFAULT_SPEED = -1;
const DetermineSpeed = ({ userData, setUserData }) => {
  const [downloadSpeed, setDownloadSpeed] = useState(DEFAULT_SPEED);
  const [uploadSpeed, setUploadSpeed] = useState(DEFAULT_SPEED);

  useEffect(() => {
    (async () => {
      const { downloadSpeed, uploadSpeed } = await getSpeeds();
      setDownloadSpeed(downloadSpeed);
      setUploadSpeed(uploadSpeed);
      setUserData({...userData, 'dwnldSpd': downloadSpeed, 'upldSpd': uploadSpeed})
    })();
  }, [])

  return (
    <div className="determine-speed">
      <h4>Download speed: {downloadSpeed === DEFAULT_SPEED ? '...' : downloadSpeed}</h4>
      <h4>Upload speed: {uploadSpeed === DEFAULT_SPEED ? '...' : uploadSpeed}</h4>
    </div>
  );
};

export default DetermineSpeed;
