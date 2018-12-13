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
        this.goHome = props.actions[0]
        this.shareTask = props.actions[1]
        this.deleteTask = props.actions[2]
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
                this.goHome()
            } else if (contentIndex === 12){
                this.deleteTask()
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