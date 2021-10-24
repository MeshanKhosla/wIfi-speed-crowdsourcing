import { useState, useEffect } from "react";
import { getSpeeds } from '../measureSpeeds.js';
import {Card, ProgressBar} from "react-bootstrap";

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
      <Card
          bg='success'
          text='white'
          className="user-info-card mb-2 mt-2"
      >
        <Card.Header>WiFi speeds</Card.Header>
        <Card.Body>
          <Card.Text>
            <p>Download speed: {downloadSpeed === DEFAULT_SPEED ? <ProgressBar variant='warning' animated now={100} /> : downloadSpeed}</p>
            <p>Upload speed: {uploadSpeed === DEFAULT_SPEED ? <ProgressBar variant='warning' animated now={100} /> : uploadSpeed}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetermineSpeed;
