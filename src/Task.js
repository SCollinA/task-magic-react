import React from 'react'

export default function Task(props) {
    return (
        <div 
        className={`Task ${props.className || 'child'}`} 
        id={props.id} 
        >
            <h1 className='taskName'
            onClick={() => {
            // should select task for editing
            console.log('clicked task div')
            props.selectTask(props.task)
            }}>
                {props.task.name}
                {/* {props.selectedTask && props.selectedTask.id === props.task.id ? props.searchTerm : props.task.name} */}
            </h1>
            {(!props.currentTask && props.task.active) && (
            <div 
            className="childNames" 
            onClick={() => {
                console.log(`${props.task.name} selected`)
                props.selectTask(props.task)
            }}>
                <p>
                    {props.task.children && 
                        props.task.children.map(child => child.active && child.name)
                        .filter(child => child !== false).join(', ')}
                </p>
            </div>
            )}
            {!props.currentTask && (
            <div className='Checkbox'
            onClick={() => {
                console.log(`${props.task.name} changed`)
                props.completeTask(props.task)
            }}>
                <h1>
                    {props.task.active ? '' : '✔️'}
                </h1>
            </div>
            )}
        </div>
        )
}