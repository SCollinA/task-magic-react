import React from 'react'

export default function DashTools(props) {
    const iconArray = [
        '🏠',
        'ℹ️',
        '➕',
        '✏️',
        '📝',
        '📅',
        '⏱',
        '🔔',
        '📷',
        '🎵',
        '🌎',
        '🗺',
        '->',
        '💬',
        '🗑',
        '🔎',
    ]
    // const imgSrcArray = [
        
    // ]
    return (
        <div className="DashTools">
            {/* {imgSrcArray.map((imgSrc, imgSrcIndex) => {
                return <img src={imgSrc} onClick={() => props.updateContent(imgSrcIndex)} />
            })} */}
            {iconArray.map((icon, iconIndex) => {
                return (
                    <h1 className={`hackerStyle ${iconIndex === props.contentChoice ? "toolbarIcon toolChoice" : "toolbarIcon"} stickyContain`} 
                    key={iconIndex}
                    onClick={() => props.updateContent(iconIndex)}>
                        <span role="img" aria-label="">{icon}</span>
                    </h1>
                )
            })}
        </div>
    )
}