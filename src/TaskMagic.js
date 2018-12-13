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
            previousTasks: [],
            contentChoice: 1
        }
    }

    componentDidMount() {
        fetch(`${urlPrefix}/test-react`)
        .then(res => res.json())
        .then(data => this.setState({...data}))
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


    _updateContent = contentIndex => {
        console.log(`updating content to ${contentIndex}`)
        this.setState({
            contentChoice: contentIndex
        }, () => {
            if (this.state.contentChoice === 0) {
                this._goHome()
            }
        })
    }

    _updateSearch = searchTerm => {
        console.log(`Search Term: ${searchTerm}`)
        const taskToEdit = this.state.taskToEdit ? {...this.state.taskToEdit, name: searchTerm} : null
        this.setState({
            searchTerm,
            taskToEdit
        })
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
        const previousTasks = this.state.previousTasks
        while (previousTasks.map(task => task.id).includes(taskToSelect.id)) {
            previousTasks.shift()
        }
        // update search box text to task name
        fetch(`${urlPrefix}/test-react-task`, {
            method: 'post',
            body: JSON.stringify({taskToSelect}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchTerm: '',
                previousTasks: [this.state.currentTask, ...previousTasks]
            }, this.setState({
                ...data
            }))
        })
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

    _deleteTask = () => {
        console.log(`deleting task ${this.state.currentTask.name}`)
        fetch(`${urlPrefix}/test-react-delete`, {
            method: 'post', 
            body: JSON.stringify({iDToDelete: this.state.previousTasks[0]}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => { 
            this.setState({
                ...data, 
                currentTask: this.state.previousTasks[0] || this.state.currentTask, 
                previousTasks: [...this.state.previousTasks.slice(1, this.state.previousTasks.length - 1)]
            })
        })
    }

    render() {
        return (
            <div className="TaskMagic">
                {(this.state.user && (
                <>
                    <Tasks
                    user={this.state.user}
                    logout={this._logout}
                    parents={(this.state.contentChoice !== 2 && this.state.contentChoice !== 3) ? this.state.parents : []}
                    currentTask={this.state.contentChoice !==2 ? this.state.currentTask : []}
                    children={this.state.contentChoice!== 2 ?  this.state.children : []}
                    searchTasks={(this.state.contentChoice === 2 || this.state.contentChoice === 3) ? this.state.userTasks.filter(task => task.name.includes(this.state.searchTerm)) : []}
                    selectTask={this._selectTask}
                    completeTask={this._completeTask}
                    />
                    <Dashboard
                    task={this.state.currentTask}
                    actions={[
                        this._goHome, 
                        this._searchTasks, 
                        event => {
                            event.preventDefault()
                            this._addTask()
                        }, 
                        this._shareTask, 
                        this._deleteTask]}
                    contentChoice={this.state.contentChoice}
                    updateContent={this._updateContent}
                    prompt={'Input Task'}
                    searchTerm={this.state.searchTerm}
                    updateSearch={event => this._updateSearch(event.target.value)}
                    searchSubmit={event => {
                        event.preventDefault()
                        this._addTask()
                    }}
                    onReset={() => this.setState({searchTerm: ''})}
                    />
                </>
                )) || (
                    <UserInput 
                    // user={this.state.user}
                    login={event => {
                        event.preventDefault()
                        this._login(event.target[0].value, event.target[1].value)
                    }}
                    register={event => this._register(event.target.form[0].value, event.target.form[1].value)}
                    />
                )}
            </div>
        )
    }
}