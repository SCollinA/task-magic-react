import React, {Component} from 'react'
import DashContent from './DashContent'
import DashTools from './DashTools'

// export default function TaskDashboard(props) {
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            <div className={`Dashboard`}>
                <DashContent/>
                <DashTools updateContent={this._updateContent}/>
            </div>
        )
    }
}