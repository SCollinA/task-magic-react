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

    // componentDidMount() {
    //     this.setState({
    //         contentChoice: 1
    //     })
    // }

    _updateContent = contentIndex => {
        console.log(`updating content to ${contentIndex}`)
        this.setState({
            contentChoice: contentIndex
        })
    }

    render() {
        return (
            <div className={`Dashboard`}>
                <DashContent 
                action={this.props.actions[this.state.contentChoice]} 
                contentChoice={this.state.contentChoice}
                {...this.props}/>
                <DashTools updateContent={this._updateContent}/>
            </div>
        )
    }
}