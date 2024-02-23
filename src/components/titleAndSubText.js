import React from 'react';

import './titleAndSubText.css'
function titleAndSubText({title, subtext, animation}) {
  return (
    <>  
        
        <div className={animation}>
            <div className="homeTitle-wrapper">
                <h1 className="homeTitle">
                    {title}
                </h1>
            </div>
        </div>
        <div className={animation}>
            <div className="subtitle-wrapper">
                <h2 className="subtitle">
                    {subtext}
                </h2>
            </div>
        </div>
        
    </>
  )
}

export default titleAndSubText

