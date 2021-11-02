import React, {useState} from 'react'
import logo from '../images/logo.png'

import cart from '../images/cart.png'

import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Navbar() {
    //const isLoggedIn = useSelector(state=>state.userReducer.isLoggedIn) 
    const clearLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
        //eslint-disable-next-line
        location.href='/';
    }
    let total = JSON.parse(localStorage.getItem('product') as string)??[]
    total = total.length

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
                <li style={{display: localStorage.getItem('token')? 'none': 'block'}}><a href="/login/">Login</a></li>
                <li style={{display: localStorage.getItem('token')? 'block': 'none'}}><a href="#" onClick={clearLocalStorage} >Logout</a></li>
                <div className="cart" >
                    <li><a href='/cartPage'><img className="cartImage" src={cart} width="50px" height="40px"></img></a></li>
                    <li><a href='/cartPage'style={{fontSize: "2em", color:"red", margin:".3em"}}>{total}</a></li>
                </div>
            </ul>

            
        </div>
        </div>
        
    )
}

export default Navbar
