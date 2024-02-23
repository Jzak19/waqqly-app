import React from 'react';

import './inputBox.css'
function inputBox({id, text}) {
  return (
    <>  
        <div className="input-wrapper">
            <label for={id} className="textLabel">{text}</label>
            <input type="text" id={id} className="inputField" required/>
        </div>
        
    </>
  )
}

export default inputBox