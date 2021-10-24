import { useState, useEffect } from 'react';
import buildings from "../buildings";

const withinSquare = (loc, center, radius) => {
  center = Math.abs(parseFloat(center));
  loc = Math.abs(parseFloat(loc));
  radius = Math.abs(parseFloat(radius));
  return center - radius < loc && loc < center + radius;
}

const GetUserLocation = ({ userData, setUserData }) => {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  const [userBuilding, setUserBuilding] = useState(null);
  const [gotLocation, setGotLocation] = useState(null);

    useEffect(() => {
      getLocation();
    }, [])

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
    console.log("gotlocation");
    setGotLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLatLong, handleLatLongError);
    } else {
      console.log('Not supported')
    }
  }

  const GetBuilding = (event) => {
    console.log('here');
    setGotLocation(true);
    event.preventDefault();
    // Since buildings (hopefully) don't overlap, just set if we find a match
    for (const bldg of buildings) {
      const atVLSB = bldg.name === "Valley Life Sciences Building";
      const inLat = withinSquare(userLatitude, bldg.lat, bldg.radius);
      const inLon = withinSquare(userLongitude, bldg.long, bldg.radius);

      if (inLat && inLon) {
        setUserBuilding(bldg.name);
      }
    }
  }

  return (
      <div className="get-user-location">

        <form onSubmit={GetBuilding}>        
          <label>
            Latitude: 
            <input type="text" vale={userLatitude} onChange={(e) => setUserLatitude(e.target.value)} />        
          </label>
          <label>
            Longitude: 
            <input type="text" vale={userLongitude} onChange={(e) => setUserLongitude(e.target.value)} />        
          </label>
          <input type="submit" value="Submit" />
        </form>

        {gotLocation && (
          <h4>LOCATION: {userBuilding ?? "not in any saved buildings"} </h4>
        )}

        {locationErrorMsg && (
          <h4>Error with location: {locationErrorMsg}</h4>
        )}
        {userLatitude && (
            <h4>Latitude: {userLatitude}</h4>
        )}
        {userLongitude && (
            <h4>Longitude: {userLongitude}</h4>
        )}
      </div>
  );
}

export default GetUserLocation;
