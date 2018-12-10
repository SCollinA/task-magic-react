import React, {Component} from 'react'
import TaskContent from './TaskContent'
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

    // componentDidMount() {
    //     this.setState({
    //         content: this.content[0]
    //     })
    // }

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
            <div className="TaskDashboard">
                {/* <TaskContent task={props.task}/> */}
                <TaskContent task={this.props.task} contentChoice={this.state.contentChoice}/>
                <TaskToolbar updateContent={this._updateContent} contentChoice={this.state.contentChoice}/>
            </div>
        )
    }
}