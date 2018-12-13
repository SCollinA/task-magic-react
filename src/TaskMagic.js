import React, {Component} from 'react'
import UserInput from './UserInput'
import Tasks from './Tasks';
import Dashboard from './Dashboard'
const urlPrefix = '/api'

export default class TaskMagic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            parents: [],
            currentTask: null,
            children: [],
            user: null,
            userTasks: [],
            taskToEdit: null
        }
    }

    componentDidMount() {
        fetch(`${urlPrefix}/test-react`)
        .then(res => res.json())
        .then(data => this.setState({...data}))
        // .then(() => this.state.user && this._getAllTasks())
    }

    _login = (username, password) => {
        fetch(`${urlPrefix}/login`, {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .catch(console.log)
    }

    _register = (username, password) => { 
        fetch(`${urlPrefix}/register`, {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .catch(console.log)
    }

    _logout = () => {
        fetch(`${urlPrefix}/logout`)
        .then(res => res.json())
        .then(data => this.setState({...data}))
    }

    _updateSearch = searchTerm => {
        console.log(`Search Term: ${searchTerm}`)
        const taskToEdit = this.state.taskToEdit ? {...this.state.taskToEdit, name: searchTerm} : null
        this.setState({
            searchTerm,
            taskToEdit
        }
        // , () => {
        //     console.log('updated search term')
        //     if (this.state.taskToEdit) {
        //         this.setState({
        //             currentTask: {...this.state.currentTask, name: this.state.searchTerm}
        //         }, () => console.log('edited current task name'))   
        //     }
        // }
        )
    }

    _resetSearch = () => {
        this.setState({
            searchTerm: '',
            taskToEdit: null,
        })
    }

    _goHome = () => {
        fetch('/home')
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .then(this._resetSearch)
    }

    _addTask() {
        // find exact matches for search term in all of users tasks
        const globalSearchResult = this.state.userTasks.filter(task => task.name === this.state.searchTerm)[0]
        // if there are no matches
        if (!globalSearchResult) { 
            console.log(`adding new task ${this.state.searchTerm}`)
            // then add the new task
            fetch(`${urlPrefix}/test-react`, { 
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
        } else {
            // some global search results found
            // find exact matches for search result in current task
            const localSearchResult = this.state.children.filter(task => task.name === this.state.searchTerm)[0]
            // if there are no current children with search term, add global result
            if (!localSearchResult) {
                this._subTask(globalSearchResult)
            } else {
                // do nothing
            }
        }
    }

    _shareTask = userToShare => {
        const taskToEdit = this.state.taskToEdit
        const currentTask = this.state.currentTask
        console.log(userToShare, taskToEdit, currentTask)
        fetch(`${urlPrefix}/test-react-share-task`, {
            method: 'post',
            body: JSON.stringify({username: userToShare, taskID: (taskToEdit && taskToEdit.id) || (currentTask && currentTask.id)}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                ...data
            })
        })
    }

    _subTask = taskToSubtask => {
        const taskExists = this.state.children.map(child => child.id).filter(childID => childID === taskToSubtask.id)
        if (taskExists.length === 0) {
            console.log(`adding existing task ${taskToSubtask.name}`)
            fetch(`${urlPrefix}/test-react-sub-task`, { 
                method: 'post', 
                body: JSON.stringify({taskID: taskToSubtask.id}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    searchTerm: '',
                    ...data
                })
            })
        } else {
            console.log(`${taskToSubtask.name} already a child`)
            this.setState({
                searchTerm: ''
            })
        }
    }

    _selectTask = taskToSelect => {
        console.log(`selecting task ${taskToSelect.name}`)
        // update search box text to task name
        fetch(`${urlPrefix}/test-react-task`, {
            method: 'post',
            body: JSON.stringify({taskToSelect}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                ...data,
                searchTerm: '',
                taskToEdit: null
            })
        })
    }

    _editTask = taskToEdit => {
        console.log(`editing task ${taskToEdit.name}`)
        // if there is no current task to edit, OR this is a new taskToEdit
        if (!this.state.taskToEdit || taskToEdit.id !== this.state.taskToEdit.id) {
            this.setState({
                searchTerm: taskToEdit.name,
                taskToEdit
            })
        } else {
            // this._selectTask(taskToEdit)
            // there is a current task and this task to edit is already being edited, so deselect
            this.setState({
                searchTerm: '',
                taskToEdit: null
            })
        }
    }

    _updateName = taskToUpdate => {
        fetch(`${urlPrefix}/test-react-name`, {
            method: 'post',
            body: JSON.stringify({taskToUpdate, name: this.state.searchTerm}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchTerm: '',
                taskToEdit: null,
                ...data
            })
        })
    }

    _completeTask = taskToComplete => {
        fetch(`${urlPrefix}/test-react-complete`, {
            method: 'post',
            body: JSON.stringify(taskToComplete),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => this.setState({...data}))
        .then(() => {
            // get the child task with task to edit id
            const taskToEdit = this.state.taskToEdit && this.state.children.filter(child => child.id === this.state.taskToEdit.id)[0]
            // set task to edit equal to that to update
            this.setState({taskToEdit})
        })
    }

    _deleteTask = iDToDelete => {
        console.log(`deleting task id ${iDToDelete}`)
        fetch(`${urlPrefix}/test-react-delete`, {
            method: 'post', 
            body: JSON.stringify({iDToDelete}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => { this.setState({...data})})
    }

    render() {
        return (
            <div className="TaskMagic">
                <UserInput 
                user={this.state.user}
                login={event => {
                    event.preventDefault()
                    this._login(event.target[0].value, event.target[1].value)
                }}
                register={event => this._register(event.target.form[0].value, event.target.form[1].value)}
                logout={this._logout}
                prompt={'Input Task'}
                searchTerm={this.state.searchTerm}
                updateSearch={event => this._updateSearch(event.target.value)}
                searchSubmit={event => {
                    event.preventDefault()
                    this._addTask()
                }}
                onReset={() => this.setState({searchTerm: ''})}
                />

                {this.state.user && 
                <>
                    <Tasks
                    parents={this.state.parents}
                    currentTask={this.state.currentTask}
                    children={this.state.children}
                    searchTasks={(this.state.searchTerm !== '' && this.state.userTasks.filter(task => task.name.includes(this.state.searchTerm))) || false}
                    selectTask={this._selectTask}
                    completeTask={this._completeTask}
                    />
                    <Dashboard
                    task={this.state.currentTask}
                    goHome={this._goHome}
                    />
                </>
                }
            </div>
        )
    }
}