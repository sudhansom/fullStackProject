import React from 'react'
import logo from './logo.png'

function Navbar() {
    return (
        <div className="navbar">
            <ul className="leftSide">
                <li><a href="#"><img src={logo} height="30px" width="40px"></img></a></li>
                <li><a href="#">Home</a></li>
                <li>Abc</li>
            </ul>
            <ul className="rightSide">
                <li><a href="/addProduct/">AddProduct</a></li>
                <li>Logout</li>
                <li>Cart</li>
            </ul>
            
        </div>
    )
}

export default Navbar
