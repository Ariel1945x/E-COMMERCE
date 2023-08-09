import { Link } from 'react-router-dom';

import Car from './Car';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavApp = () => {
    return(
        <Navbar 
        style={{
            position: "fixed", 
            top: 0, 
            left: 0, 
            backgroundColor: "#fff",
            width: "100%",
            zIndex: 1000,
            marginBottom: "20rem"
        }}
        >
            <Container>
                <Navbar.Brand as={Link} to={"/"}><h1>e-commerce</h1></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/login"}>
                        <svg className='svg-navapp' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M11.5 8A1.5 1.5 0 0 1 13 9.5v.5c0 1.971-1.86 4-5 4c-3.14 0-5-2.029-5-4v-.5A1.5 1.5 0 0 1 4.5 8h7Zm0 1h-7a.5.5 0 0 0-.5.5v.5c0 1.438 1.432 3 4 3s4-1.562 4-3v-.5a.5.5 0 0 0-.5-.5ZM8 1.5A2.75 2.75 0 1 1 8 7a2.75 2.75 0 0 1 0-5.5Zm0 1A1.75 1.75 0 1 0 8 6a1.75 1.75 0 0 0 0-3.5Z"/></svg>
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/purchases"}>
                        <svg className='svg-navapp' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M20 21H4V10h2v9h12v-9h2v11M3 3h18v6H3V3m6.5 8h5c.28 0 .5.22.5.5V13H9v-1.5c0-.28.22-.5.5-.5M5 5v2h14V5H5Z"/></svg>
                    </Nav.Link>
                    <Nav.Link>
                        <Car />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavApp