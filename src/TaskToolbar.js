import React from 'react'

export default function TaskToolbar(props) {
    const imgSrcArray = [
        
    ]
    return (
        <div className="TaskToolbar">
            {imgSrcArray.map((imgSrc, imgSrcIndex) => {
                <img src={imgSrc} onClick={() => props.updateContent(imgSrcIndex)} />
            })}
        </div>
    )
}