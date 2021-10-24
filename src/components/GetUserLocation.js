import { useState, useEffect } from 'react';
import {Card, ProgressBar} from 'react-bootstrap';

const GetUserLocation = ({ userData, setUserData }) => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

    useEffect(() => {
      getLocation();
    }, [])

  const updateLatLong = location => {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    setUserLatitude(lat);
    setUserLongitude(long);
    let date = new Date().toISOString();
    const correctlyFormattedDate = date.substring(0, 10) + " " + date.substring(11, date.length - 1);
    setUserData({...userData, 'lat': lat, 'long': long, 'dateTime': correctlyFormattedDate})
  }

  const handleLatLongError = error => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setLocationErrorMsg("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationErrorMsg("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setLocationErrorMsg("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setLocationErrorMsg("An unknown error occurred.");
        break;
    }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLatLong, handleLatLongError);
    } else {
      console.log('Not supported')
    }
  }
  return (
      <div className="get-user-location">
        <Card
            bg='info'
            text='white'
            className="user-info-card mb-2 mt-2"
        >
          <Card.Header>Your Location</Card.Header>
          <Card.Body>
            <Card.Text>
              {locationErrorMsg && (
                  <p>Error with location: {locationErrorMsg}</p>
              )}
              {userLatitude ? (
                  <p>Latitude: {userLatitude}</p>
              ) : <ProgressBar variant='warning' animated now={100} />}
              {userLongitude && (
                  <p>Longitude: {userLongitude}</p>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
  );
}

export default GetUserLocation;
