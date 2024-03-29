import React, { useEffect, useState } from 'react';
import './inputBox.css'




function InputBox({id, text, formDataValue, onChange, initialValue}) {

  const [value, setValue] = useState(initialValue);

  // Update local state when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    if (value === initialValue) {
      setValue('');
    }
  }
  return (
    <>  
        <div className="input-wrapper">
            <label for={id} className="textLabel">{text}</label>
            <input type="text" name={id} onClick={handleClick} defaultValue={initialValue} className="inputField" required onChange={onChange}/>
        </div>
        
    </>
  )
}

export default InputBox