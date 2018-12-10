import React from 'react'

export default function TaskToolbar(props) {
    const iconArray = [
        '🏠',
        'ℹ️',
        '💬',
        '🗺',
        '📅',
        '🌎',
        '📷',
        '🎵',
        '⏱',
        '📝',
        '🔔',
        '->',
        '🗑',
    ]
    // const imgSrcArray = [
        
    // ]
    return (
        <div className="TaskToolbar">
            {/* {imgSrcArray.map((imgSrc, imgSrcIndex) => {
                return <img src={imgSrc} onClick={() => props.updateContent(imgSrcIndex)} />
            })} */}
            {iconArray.map((icon, iconIndex) => {
                return (
                    <h1 className={iconIndex === props.contentChoice ? "toolbarIcon toolChoice" : "toolbarIcon"} 
                    key={iconIndex}
                    onClick={() => props.updateContent(iconIndex)}>
                        {icon}
                    </h1>
                )
            })}
        </div>
    )
}