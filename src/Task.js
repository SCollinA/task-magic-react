import React from 'react'

export default function Task(props) {
    return (
        <div 
        className={`Task ${props.className}`} 
        id={props.id} 
        onClick={() => {
            // should select task for editing
            console.log('clicked task div')
            props.editTask(props.task)
        }}>
            <h1 >
                {props.task.name}
                {/* {props.selectedTask && props.selectedTask.id === props.task.id ? props.searchTerm : props.task.name} */}
            </h1>
            {props.task.active ? 
            (<div 
            className="childNames" 
            onClick={() => {
                // console.log(`${props.task.name} selected`)
                // props.selectTask(props.task)
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
            </button>) 
            }
            {/* <div className="taskTimes">
                <h4>{props.task.time_changed}</h4>
                <h6>{props.task.time_created}</h6>
            </div> */}
            <h4 onClick={() => {
                console.log(`${props.task.name} changed`)
                props.completeTask(props.task)
            }}>{props.task.active.toString()}</h4>
        </div>
        )
}