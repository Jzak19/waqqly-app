import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';


import './logoLink.css'
function logoLink() {
  return (
    <>
        <div className="logoLink-wrapper">
            <Link to="/waqqly-app" style={{textDecoration:"none", color:"black"}}>
                <div className="logoText">
                    Waqq.ly
                </div>
            </Link>
        </div>
    </>
    )
}

export default logoLink