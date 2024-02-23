import React from 'react';

import './choiceBox.css'
function choiceBox({color, title, bodyText}) {
  return (
    <>
        <div className="box-wrapper">
            <div className="box" style={{backgroundColor: color}}>
                
                    <h1 className="boxTitle">
                        {title}
                    </h1>
                    <div className="boxBody-wrapper">
                        <h2 className="boxBody">
                            {bodyText}
                        </h2>
                    </div>
                
           
            </div>
        </div>
    </>
  )
}

export default choiceBox