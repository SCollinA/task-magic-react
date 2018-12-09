import React, {Component} from 'react'
import TaskContent from './TaskContent'
import TaskInfo from './TaskInfo'
import TaskToolbar from './TaskToolbar'

// export default function TaskDashboard(props) {
export default class TaskDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: props.task,
            content: null
        }
        this.content = [
            <TaskInfo task={this.state.task}/>,

        ]
    }

    componentDidMount() {
        this.setState({
            content: this.content[0]
        })
    }

    _updateContent = contentIndex => {
        this.setState({
            content: this.content[contentIndex]
        })
    }

    render() {
        return (
            <div className="TaskDashboard">
                {/* <TaskContent task={props.task}/> */}
                <TaskContent content={this.state.content}/>
                <TaskToolbar updateContent={this._updateContent}/>
            </div>
        )
    }
}