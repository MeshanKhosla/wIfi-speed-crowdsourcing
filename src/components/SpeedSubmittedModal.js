import {Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";

const SpeedSubmittedModal = ({ showModal, setShowModal }) => {
  return (
      <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            WiFi Information Submitted!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Thank you for contributing the WiFi speed in your area! Click <Link to='/map'>here</Link> to view the map!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default SpeedSubmittedModal;