import React, {Component} from 'react'
import Tasks from './Tasks'
import TaskForm from './TaskForm'

export default class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            tasks: [],
            selectedTask: null
        }
    }

    componentDidMount() {
        fetch('/test-react')
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                tasks
            })
        })
    }
    _updateSearch = searchTerm => {
        console.log(`Search Term: ${searchTerm}`)
        this.setState({
            searchTerm
        }, () => console.log('updated search term'))
    }

    _addTask() {
        const taskExists = this.state.tasks.filter(task => task.name === this.state.searchTerm)
        console.log(taskExists)
        if (!taskExists.length > 0) {
            fetch('/test-react', { 
                method: 'post', 
                body: JSON.stringify({taskName: this.state.searchTerm}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(tasks => {
                this.setState({
                    searchTerm: '',
                    tasks
                })
            })
        }
    }

    _selectTask = taskToSelect => {
        const deselect = this.state.selectedTask === taskToSelect
        // update search box text to task name
        this.setState({
            searchTerm: deselect ? '' : taskToSelect.name,
            selectedTask: deselect ? null : taskToSelect
        })
    }

    _updateName = taskToUpdate => {
        fetch('/test-react-name', {
            method: 'post',
            body: JSON.stringify({taskToUpdate, name: this.state.searchTerm}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                searchTerm: '',
                tasks,
                selectedTask: null
            })
        })
    }

    _completeTask = taskToComplete => {
        fetch('/test-react-complete', {
            method: 'post',
            body: JSON.stringify(taskToComplete),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                tasks
            })
        })
    }

    _deleteTask = iDToDelete => {
        fetch('/test-react-delete', {
            method: 'delete', 
            body: JSON.stringify({taskID: iDToDelete}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                tasks
            })
        })
    }

    render() {
        return (
            <div className="taskList">
                <h1>Task List!!!</h1>
                <TaskForm searchTerm={this.state.searchTerm} 
                onSubmit={event => {
                    event.preventDefault()
                    this.state.selectedTask ? this._updateName(this.state.selectedTask) : this._addTask()
                }} 
                onChange={event => this._updateSearch(event.target.value)}
                />
                <Tasks tasks={this.state.tasks} 
                selectTask={this._selectTask}
                completeTask={this._completeTask}
                deleteTask={this._deleteTask}
                searchTerm={this.state.searchTerm}
                selectedTask={this.state.selectedTask}
                />
            </div>
        )
    }
}