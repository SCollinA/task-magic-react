import React, {Component} from 'react'
import TaskDashContent from './TaskDashContent'
import TaskToolbar from './TaskToolbar'

// export default function TaskDashboard(props) {
export default class TaskDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // task: props.task,
            contentChoice: 1
        }
    }

    componentDidMount() {
        this.setState({
            contentChoice: 1
        })
    }

    _updateContent = contentIndex => {
        console.log(`updating content to ${contentIndex}`)
        this.setState({
            contentChoice: contentIndex
        }, () => {
            if (contentIndex === 0) {
                this.props.goHome()
            } else if (contentIndex === 12){
                this.props.deleteTask(this.props.task.id)
            }
        })
    }

    render() {
        return (
            <div className={`TaskDashboard`}>
                {/* <TaskContent task={props.task}/> */}
                <TaskDashContent
                task={this.props.task} 
                contentChoice={this.state.contentChoice}
                shareTask={this.props.shareTask}/>
                <TaskToolbar 
                updateContent={this._updateContent} 
                contentChoice={this.state.contentChoice}/>
            </div>
        )
    }
}