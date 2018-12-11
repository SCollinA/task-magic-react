import React from 'react'

export default function Task(props) {
    return (
        <div style={{zIndex:props.z_index}}
        className={`Task stickyContain ${props.isCurrentTask || 'hackerStyle'} ${props.className || 'child'}`} 
        id={props.id} 
        >
            <div className='taskName'
            onClick={() => {
            // should select task for editing
            console.log('clicked task div')
            props.editTask(props.task)
            }}>
                <h1>{props.task.name}</h1>
                {/* {props.selectedTask && props.selectedTask.id === props.task.id ? props.searchTerm : props.task.name} */}
            </div>
            {/* This is not the current task and is active */}
            {(!props.isCurrentTask) && (
            // {(!props.isCurrentTask && props.task.active) && (
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
            {/* This is not the current task */}
            {/* the task list is not searching */}
            {((!props.isCurrentTask && !props.isSearching) && (
                <div className='Checkbox'
                onClick={() => {
                    console.log(`${props.task.name} changed`)
                    props.completeTask(props.task)
                }}>
                    <h1>
                        <span role="img" aria-label="sheep">{props.task.active ? '' : '✔️'}</span>
                    </h1>
                </div>
            )) || 
            // {/* The task is not a current child */}
            ((!props.isCurrentTask && (props.task.id !== props.currentTask.id && !props.currentChildren.map(child => child.id).includes(props.task.id))) && (
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