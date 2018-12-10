import React, {Component} from 'react'
import TaskForm from './TaskForm'
import UserForm from './UserForm'
import Tasks from './Tasks'
import TaskDashboard from './TaskDashboard'
const urlPrefix = '/api'

export default class TaskList extends Component {
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

    _login = (username, password, login) => {
        const url = login ? `${urlPrefix}/login` : `${urlPrefix}/register`
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
            <div className="TaskList">
                <div className="header">
                    <TaskForm searchTerm={this.state.searchTerm} 
                    onSubmit={event => {
                        event.preventDefault()
                        this.state.taskToEdit ? this._updateName(this.state.taskToEdit) : this._addTask()}} 
                    editTask={this._editTask}
                    completeTask={this._completeTask}
                    onChange={event => this._updateSearch(event.target.value)}
                    // currentTask={this.state.currentTask}
                    // currentTask={this.state.taskToEdit || this.state.currentTask}
                    currentTask={this.state.taskToEdit && this.state.taskToEdit.id === this.state.currentTask.id ? {...this.state.currentTask, name: this.state.searchTerm} : this.state.currentTask}
                    onReset={this._resetSearch}
                    />
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
                <Tasks children={(this.state.searchTerm && !this.state.taskToEdit) ? this.state.userTasks.filter(task => task.name.includes(this.state.searchTerm)) : this.state.children}
                parents={(this.state.searchTerm && !this.state.taskToEdit) ? [] : this.state.parents}
                selectTask={this._selectTask}
                // selectTask={!this.state.taskToEdit || this._selectTask}
                editTask={this.state.searchTerm && !this.state.taskToEdit ? this._selectTask : this._editTask}
                completeTask={this.state.searchTerm && !this.state.taskToEdit ? this._subTask : this._completeTask}
                deleteTask={this._deleteTask}
                taskToEdit={this.state.taskToEdit}
                />
                {/* <TaskDashboard task={this.state.taskToEdit || this.state.currentTask} goHome={this._goHome}/> */}
                <TaskDashboard key={(this.state.currentTask && this.state.currentTask.id)}
                task={this.state.taskToEdit} 
                goHome={this._goHome} 
                deleteTask={this._deleteTask}
                />
            </div>
        )
    }
}