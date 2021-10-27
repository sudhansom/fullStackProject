import React from 'react'
import logo from '../images/logo.png'

import { Button, Card, Container, Form, Row, Col, Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Navbar() {
    return (
        <div>
        <div className="navbar">
            <ul className="leftSide">
                <li><a href="/"><img src={logo} height="30px" width="40px"></img></a></li>
                <li>
                    
                </li>
                <li><a href='/products/'>Products</a></li>
            </ul>
            <div>
                
            </div>
            <div>
                <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic">
                           Category
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </div>
            <ul className="rightSide">
                <li><a href="/login/">Login</a></li>
                <li>Logout</li>
                <li>Cart</li>
            </ul>
            
        </div>
        </div>
        
    )
}

export default Navbar
