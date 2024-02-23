import React from 'react';

import './submitButton.css'
function submitButton() {
  return (
    <>
        <div className="button-wrapper">
            <input className='submitButton' type='submit' value='Submit'/>
        </div>
    </>
    )
}

export default submitButton