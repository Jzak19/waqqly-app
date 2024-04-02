import React from 'react'

import './alignedBox.css'
import IMAGES from '../assets/images'

function AlignedBox ({alignment, title, subtext, image}) {
    return(
        <div className="boxContainer">
            <div className={alignment}>
                <div className="moreAlign">
                    <h1 className="boxTitleAligned">
                        {title}
                    </h1>

                    <h2 className="boxSubtextAligned">
                        {subtext}
                    </h2>
                </div>
                
                <div className="imageContainer" style={{backgroundImage: `url(${image})` }}></div>
                
            </div>
            
        </div>
    )
    
}

export default AlignedBox