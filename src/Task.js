import React from 'react'

export default function Task(props) {
    return (
        <div 
        className={`Task ${props.className}`} 
        id={props.id} 
        >
            <h1 onClick={() => {
            // should select task for editing
            console.log('clicked task div')
            props.editTask(props.task)
            }}>
                {props.task.name}
                {/* {props.selectedTask && props.selectedTask.id === props.task.id ? props.searchTerm : props.task.name} */}
            </h1>
            {props.task.active ? 
            (<div 
            className="childNames" 
            onClick={() => {
                console.log(`${props.task.name} selected`)
                props.selectTask(props.task)
            }}>
                <p>
                    {props.task.children && props.task.children.map(child => child.name).join(', ')}
                </p>
            </div>) :
            (<button 
            name='deleteTask' 
            onClick={() => props.deleteTask(props.task.id)}
            >
                Delete task
            </button>)}
            <div className='Checkbox'
            onClick={() => {
                console.log(`${props.task.name} changed`)
                props.completeTask(props.task)
            }}>
                {props.task.active ? '' : '✔️'}
            </div>
        </div>
        )
}