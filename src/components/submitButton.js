import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Link} from 'react-router-dom';

import './submitButton.css'
function submitButton({destination, }) {
  return (
    <>
        <div className="button-wrapper">
            <Link to={destination} style={{textDecoration: "none"}}>
                <button className='submitButton' type='submit'/>
            </Link>
        </div>
    </>
    )
}

export default submitButton