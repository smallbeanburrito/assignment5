import { Container, Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

export default function MainNav() {
  const router = useRouter();
  const [searchField, setSearch] = useState("Search");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function navigate(e) {
    e.preventDefault();
    document.getElementById("query").value = null;
    setSearch("");
    setIsExpanded(false);
    router.push(`/artwork?title=true&q=${searchField}`);
    let queryString = `title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, queryString]);
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Keith Cao</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/search"}
                  onClick={() => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex">
              <input
                id="query"
                placeholder={searchField}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" onClick={navigate}>
                Search
              </button>
            </Form>
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/favourites"}
                    onClick={() => setIsExpanded(false)}
                  >
                    <NavDropdown.Item href="/favourites">
                      Favourites
                    </NavDropdown.Item>
                  </Nav.Link>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/history"}
                    onClick={() => setIsExpanded(false)}
                  >
                    <NavDropdown.Item href="/history">
                      Search History
                    </NavDropdown.Item>
                  </Nav.Link>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
