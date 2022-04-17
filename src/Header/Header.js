import { React, useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./header.css";
import swal from "sweetalert";
export const Header = (props) => {

  const style = {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
  };

  let user = localStorage.getItem("Name");
  const history = useHistory();

  function logOut() {

    swal({
      title: 'Are you sure want to log out?',
      text: "",
      type: 'warning',
      buttons:true
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, logout !'
    }).then((logout)=> 
    {
      if(logout)
      {

        swal(" successfully Logout",
        {
          icon: "success",
        });
        localStorage.clear();
    history.push("/login");
      }
    })
    
  }
  console.log("header called");
  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-4 rounded shadow">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">
              Timesheet
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                {localStorage.getItem("Name") ? (
                  <>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/userDetail">UserDetails</Nav.Link>
                    <Nav.Link href="/timesheet">Timesheet</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/">Register</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </>
                )}
              </Nav>

              <NavDropdown title={user} className="back rounded ">
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </nav>
      </div>
      {/* <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#Timesheet">Timesheet</Navbar.Brand>

          <Nav className="mr-auto nav_bar_wrapper">
            {localStorage.getItem("Name") ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/userDetail">UserDetails</Nav.Link>
                <Nav.Link href="/timesheet">Timesheet</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav> */}
      {}
      {/* <Nav> */}
      {/* <NavDropdown title={user} className="drop">
            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
          </NavDropdown> */}
      {/* </Nav> */}
      {/* </Container>
      </Navbar> */}
    </div>
  );
};
