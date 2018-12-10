import React from 'react'

export default function Task(props) {
    return (
        <div 
        className={`Task ${props.className || 'child'}`} 
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
            {!props.currentTask && (!props.isSearching ? (
                <div className='Checkbox'
                onClick={() => {
                    console.log(`${props.task.name} changed`)
                    props.completeTask(props.task)
                }}>
                    <h1>
                        {props.task.active ? '' : '✔️'}
                    </h1>
                </div>
            ) : (
                <div className='addButton'
                onClick={() => {
                    console.log(`${props.task.name} being added`)
                    props.subTask(props.task)
                }}>
                    <h1>➕</h1>
                </div>
            ))}
        </div>
    )
}