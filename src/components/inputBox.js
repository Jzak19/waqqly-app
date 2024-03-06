import React, { useState } from 'react';
import './inputBox.css'




function InputBox({id, text, formDataValue, onChange}) {

  return (
    <>  
        <div className="input-wrapper">
            <label for={id} className="textLabel">{text}</label>
            <input type="text" name={id} className="inputField" required formDataValue={formDataValue} onChange={onChange}/>
        </div>
        
    </>
  )
}

export default InputBox