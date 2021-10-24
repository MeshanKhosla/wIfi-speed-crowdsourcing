import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const MainNav = () => {
  return (
      <Navbar bg="dark" variant="dark" className='navbar'>
        <Container>
          <Navbar.Brand>
            <Nav.Link className='navbar-link'>
              <Link to="/">WiFi Crowdsourcing</Link>
            </Nav.Link>
        </Navbar.Brand>
          <Nav>
            <Nav.Link className='navbar-link'>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link className='navbar-link'>
              <Link to="/about">About</Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}
export default MainNav;