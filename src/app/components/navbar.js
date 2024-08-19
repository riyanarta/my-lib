"use client";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavbarComponent() {
  const pathname = usePathname();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">WASKITO LIBRARY</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={`link ${pathname === "/loan" ? "active" : ""}`}
              href="/loan"
            >
              Loan
            </Nav.Link>
            <Nav.Link
              className={`link ${pathname === "/return" ? "active" : ""}`}
              href="/return"
            >
              Return
            </Nav.Link>
            <Nav.Link
              className={`link ${pathname === "/visitor" ? "active" : ""}`}
              href="/visitor"
            >
              Visitor
            </Nav.Link>
            <NavDropdown title="Report" id="basic-nav-dropdown">
              <NavDropdown.Item href="/report/loan">
                Report Loan
              </NavDropdown.Item>
              <NavDropdown.Item href="/report/return">
                Report Return
              </NavDropdown.Item>
              <NavDropdown.Item href="/report/visitor">
                Report Visitor
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
