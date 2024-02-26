import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';

import './submitButton.css'
function submitButton() {
  return (
    <>
        <div className="button-wrapper">
            <Link to='/mapPage' style={{textDecoration: "none"}}>
                <input className='submitButton' type='submit' value='Submit'/>
            </Link>
        </div>
    </>
    )
}

export default submitButton