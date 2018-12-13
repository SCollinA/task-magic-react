import React from 'react'

export default function Task(props) {
    return (
        <div style={{zIndex:props.z_index}} className={`Task stickyContain hackerStyle ${props.className}`}
        onClick={() => {
            // should select task for editing
            console.log('clicked task div')
            props.selectTask(props.task)
        }}>
            <h1 className='taskName'>{props.task.name}</h1>
            <div className="childNames" 
            onClick={() => {
                console.log(`${props.task.name} selected`)
                props.selectTask(props.task)
            }}>
                <p>{props.task.children && 
                        props.task.children.map(child => child.active && child.name)
                        .filter(child => child !== false).join(', ')}
                </p>
            </div>
            {(props.className !== 'searchTask' && (
                <div className={`checkbox hackerStyle ${(props.task.active && 'activeTask') || 'completeTask'}`}
                    onClick={event => {
                        event.stopPropagation()
                        console.log(`${props.task.name} changed`)
                        props.completeTask(props.task)
                    }}>
                </div>
            )) || ((props.className !== 'parentTask' && !props.family.map(task => task.id).includes(props.task.id)) && (
                <div className='addButton'
                onClick={() => {
                    console.log(`${props.task.name} being added`)
                    props.subTask(props.task)
                }}>
                    <h1><span role="img" aria-label="sheep">➕</span></h1>
                </div>
            ))}
        </div>
    )
}