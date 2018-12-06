import React, {Component} from 'react'
import Tasks from './Tasks'
import TaskForm from './TaskForm'
import UserForm from './UserForm'

export default class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            children: [],
            selectedTask: null,
            user: null,
            currentTask: null
        }
    }

    componentDidMount() {
        fetch('/test-react')
        .then(res => res.json())
        .then(data => this.setState({...data}))
    }

    _login = (eventTarget) => {
        const url = eventTarget.login.name === 'login' ? '/login' : '/register'
        fetch(url, {
            method: 'post',
            body: JSON.stringify({username: eventTarget.username.value, password: eventTarget.password.value}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .catch(console.log)
    }

    _logout = () => {
        fetch('/logout')
        .then(res => res.json())
        .then(data => this.setState({...data}))
    }

    _updateSearch = searchTerm => {
        console.log(`Search Term: ${searchTerm}`)
        this.setState({
            searchTerm
        }, () => console.log('updated search term'))
    }

    _addTask() {
        const taskExists = this.state.children.filter(task => task.name === this.state.searchTerm)
        console.log(taskExists)
        if (!taskExists.length > 0) {
            fetch('/test-react', { 
                method: 'post', 
                body: JSON.stringify({taskName: this.state.searchTerm}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    searchTerm: '',
                    ...data
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
        .then(data => {
            this.setState({
                searchTerm: '',
                selectedTask: null,
                ...data
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
        .then(data => {
            this.setState({...data})
        })
    }

    _deleteTask = iDToDelete => {
        fetch('/test-react-delete', {
            method: 'delete', 
            body: JSON.stringify({taskID: iDToDelete}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({...data})
        })
    }

    render() {
        return (
            <div className="taskList">
                <div className="header">
                    <TaskForm searchTerm={this.state.searchTerm} 
                    onSubmit={event => {
                        event.preventDefault()
                        this.state.selectedTask ? this._updateName(this.state.selectedTask) : this._addTask()
                    }} 
                    onChange={event => this._updateSearch(event.target.value)}
                    />
                    <UserForm user={this.state.user} 
                    task={this.state.currentTask} 
                    login={event => {
                        event.preventDefault()
                        this._login(event.target)
                        }
                    }
                    logout={event => {
                        event.preventDefault()
                        this._logout()
                    }
                    }/>
                </div>
                <Tasks tasks={this.state.children} 
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