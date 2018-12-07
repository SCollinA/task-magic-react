import React, {Component} from 'react'
import Tasks from './Tasks'
import TaskForm from './TaskForm'
import UserForm from './UserForm'

export default class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            parents: [],
            currentTask: null,
            children: [],
            user: null,
            userTasks: []
        }
    }

    componentDidMount() {
        fetch('/test-react')
        .then(res => res.json())
        .then(data => this.setState({...data}))
        // .then(() => this.state.user && this._getAllTasks())
    }

    _login = (username, password, login) => {
        const url = login ? '/login' : '/register'
        fetch(url, {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .catch(console.log)
        // .then(() => this.state.user && this._getAllTasks())
    }

    _register = (userForm) => { 
        this._login(userForm.username.value, userForm.password.value, false)
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

    // _getAllTasks = () => {
    //     fetch('/test-react-all-tasks')
    //     .then(res => res.json())
    //     .then(userTasks => {
    //         this.setState({
    //             userTasks
    //         })
    //     })
    // }

    _selectTask = taskToSelect => {
        // update search box text to task name
        fetch('/test-react-task', {
            method: 'post',
            body: JSON.stringify({taskToSelect}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                ...data,
                searchTerm: ''
            })
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
            method: 'post', 
            body: JSON.stringify({iDToDelete}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({...data})
        })
    }

    render() {
        return (
            <div className="TaskList">
                <div className="header">
                    <TaskForm searchTerm={this.state.searchTerm} 
                    onSubmit={event => {
                        event.preventDefault()
                        this.state.selectedTask ? this._updateName(this.state.selectedTask) : this._addTask()
                    }} 
                    onChange={event => this._updateSearch(event.target.value)}
                    currentTask={this.state.currentTask} 
                    />
                    <div className='TaskInfo'>
                        <ul>
                            <li>Active: {this.state.currentTask && ((this.state.currentTask.active && 'true') || 'false')} </li>
                            <li>Time Changed: {this.state.currentTask && this.state.currentTask.time_changed}</li>
                            <li>Time Created: {this.state.currentTask && this.state.currentTask.time_created}</li>
                        </ul>
                    </div>
                    <UserForm user={this.state.user} 
                    login={event => {
                        event.preventDefault()
                        this._login(event.target.username.value, event.target.password.value, true)
                    }}
                    register={event => {
                        this._register(event.nativeEvent.path[1])
                    }}
                    logout={() => {
                        this._logout()
                    }
                    }/>
                </div>
                <Tasks children={this.state.searchTerm ? this.state.userTasks.filter(task => task.name.includes(this.state.searchTerm)) : this.state.children}
                parents={this.state.searchTerm ? [] : this.state.parents}
                selectTask={this._selectTask}
                completeTask={this._completeTask}
                deleteTask={this._deleteTask}
                />
            </div>
        )
    }
}