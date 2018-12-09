import React, {Component} from 'react'
import TaskContent from './TaskContent'
import TaskInfo from './TaskInfo'
import TaskToolbar from './TaskToolbar'

// export default function TaskDashboard(props) {
export default class TaskDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentChoice: 0
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         content: this.content[0]
    //     })
    // }

    _updateContent = contentIndex => {
        this.setState({
            contentChoice: contentIndex
        })
    }

    render() {
        return (
            <div className="TaskDashboard">
                {/* <TaskContent task={props.task}/> */}
                <TaskContent task={props.task} contentChoice={this.state.contentChoice}/>
                <TaskToolbar updateContent={this._updateContent}/>
            </div>
        )
    }
}