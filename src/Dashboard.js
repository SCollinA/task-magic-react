import React from 'react'
import DashContent from './DashContent'
import DashTools from './DashTools'

export default function Dashboard(props) {
    return (
        <div className={`Dashboard`}>
            <DashContent 
            action={props.actions[props.contentChoice]} 
            {...props}/>
            <DashTools 
            updateContent={props.updateContent} 
            contentChoice={props.contentChoice}/>
        </div>
    )
}