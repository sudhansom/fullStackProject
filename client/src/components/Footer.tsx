import React from 'react'
import { useSelector } from 'react-redux'
import {Store} from '../redux/reducers'
import logo from '../images/logo.png'
import 'font-awesome/css/font-awesome.min.css'

function Footer() {
    const isLoggedIn = useSelector((state: Store)=>state.userReducer.isLoggedIn)
    return (
        <div className="footer">
            <ul className="leftSide1">
                <li><i className="fa fa-spinner fa-spin"></i></li>
                <li><i className="fa fa-twitter fa-stack-1x"></i></li>
                {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                <li style={{display: isLoggedIn?'inline-block': 'none', marginLeft: '1em'}}><a href='/'><i className="fa fa-unlock" ></i></a></li>
                <li style={{display: isLoggedIn?'none': 'inline-block', marginLeft: '1em'}}><a href='/'><i className="fa fa-lock"></i></a></li>
                
            </ul>
            <ul className="rightSide">
                <li>&copy; CopyRight 2021</li>
            </ul>
            
            
        </div>
    )
}

export default Footer
