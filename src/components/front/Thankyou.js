import React from 'react'

const Thankyou = () => {
    return (
        <div>
            <div class="patterns">
                <svg width="100%" height="100%">
                    <defs>
                    <pattern id="polka-dots" x="0" y="0"                    width="100" height="100"
                            patternUnits="userSpaceOnUse">
                        <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
                    </pattern>  
                        <style>
                 
                </style>
                    
                    </defs>
                            
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"> </rect>
                    
                    
                
                <text x="50%" y="60%"  text-anchor="middle"  >
                    Thankyouu!
                </text>
                </svg>
                </div>
            
        </div>
    )
}

export default Thankyou
