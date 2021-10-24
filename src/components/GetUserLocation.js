import { useState } from 'react';

const GetUserLocation = ({ userData, setUserData }) => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  const updateLatLong = location => {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    setUserLatitude(lat);
    setUserLongitude(long);
    let date = new Date().toISOString();
    setUserData({...userData, 'lat': lat, 'long': long, 'dateTime': date})
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
        <button onClick={getLocation}>Get location info</button>
        {locationErrorMsg && (
          <h4>Error with location: {locationErrorMsg}</h4>
        )}
        {userLongitude && (
            <h4>Longitude: {userLongitude}</h4>
        )}
        {userLatitude && (
            <h4>Latitude: {userLatitude}</h4>
        )}
      </div>
  );
}

export default GetUserLocation;
