import { useEffect } from 'react';

const Map = ({ setShowModal }) => {

  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
      <p>Map</p>
  )
}
export default Map;