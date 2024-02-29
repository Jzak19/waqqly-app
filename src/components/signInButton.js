import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';


import './signInButton.css'
function signInButton({text, destination}) {
  return (
    <>
        
        <div className="button-wrapper">
            <Link to={destination} style={{textDecoration:"none"}}>
                <button className="signInButton">
                    
                        <div className="buttonText">
                            {text}
                        </div>
                    
                </button>
            </Link>
        </div>
        
    </>
    )
}

export default signInButton