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
            contentChoice: null
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
        if (contentIndex === this.state.contentChoice) {
            contentIndex = null
        }
        this.setState({
            contentChoice: contentIndex
        }, () => {
            if (this.state.contentChoice === 0) {
                this._goHome()
            } else if (this.state.contentChoice === 3) {
                this.setState({
                    searchTerm: this.state.currentTask.name,
                })
            }
        })
    }

    _updateSearch = searchTerm => {
        console.log(`Search Term: ${searchTerm}`)
        this.setState({
            searchTerm
        }, () => {
            if (this.state.contentChoice === 3) {
                this.setState({
                    currentTask: {...this.state.currentTask, name: this.state.searchTerm}
                })
            }
        })
    }

    _resetSearch = () => {
        console.log(this.state.searchTerm)
        if (this.state.contentChoice === 3) {
            this.setState({
                searchTerm: this.state.currentTask.name
            })
        } else {
            this.setState({
                searchTerm: ''
            })
        }
    }

    _goHome = () => {
        fetch('/home')
        .then(res => res.json())
        .then(data => this.setState({...data, contentChoice: null}))
        .then(this._resetSearch)
    }

    _addTask = () => {
        const family = [...this.state.parents, this.state.currentTask, ...this.state.children]
        if (!family.map(task => task.name).includes(this.state.searchTerm)) {
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
                    contentChoice: null,
                    ...data
                })
            })
        }
    }

    _shareTask = () => {
        console.log(`sharing ${this.state.currentTask.name} with ${this.state.searchTerm}`)
        fetch(`${urlPrefix}/test-react-share-task`, {
            method: 'post',
            body: JSON.stringify({username: this.state.searchTerm, taskID: this.state.currentTask.id}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                ...data,
                contentChoice: null
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
        if (this.state.contentChoice === 2) {
            this._subTask(taskToSelect)
        } else if (this.state.contentChoice === 12) {
            this._shareTask()
        } else if (this.state.contentChoice === 14) {
            console.log(`deleting task ${taskToSelect.name}`)
            this._deleteTask(taskToSelect.id)
        } else {
            fetch(`${urlPrefix}/test-react-task`, {
                method: 'post',
                body: JSON.stringify({taskToSelect}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(data => this.setState({...data}))
            .then(() => {
                this.setState({
                    searchTerm: this.state.contentChoice === 3 ? this.state.currentTask.name : '',
                    contentChoice: this.state.contentChoice === 15 ? null : this.state.contentChoice
                })
            })
        }
    }

    _updateName = () => {
        fetch(`${urlPrefix}/test-react-name`, {
            method: 'post',
            body: JSON.stringify({taskToUpdate: this.state.currentTask, name: this.state.searchTerm}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchTerm: '',
                contentChoice: null,
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
        console.log(`deleting task ${iDToDelete}`)
        fetch(`${urlPrefix}/test-react-delete`, {
            method: 'post', 
            body: JSON.stringify({iDToDelete}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => { 
            this.setState({
                ...data,
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
                        parents={(this.state.contentChoice !== 15 && this.state.contentChoice !== 2) ? this.state.parents : []}
                        currentTask={(this.state.contentChoice !== 15 && this.state.currentTask) || null}
                        children={this.state.contentChoice!== 15 ?  this.state.children : []}
                        tasks={
                            (this.state.contentChoice === 15 && 
                                this.state.userTasks.filter(task => task.name.includes(this.state.searchTerm)).sort((task1, task2) => task1.name > task2.name ? 1 : -1)
                            ) ||
                            (this.state.contentChoice === 2 && 
                                this.state.userTasks.filter(task => !this.state.parents.map(parentTask => parentTask.id).includes(task.id))
                                .filter(task => task.name.includes(this.state.searchTerm))
                                .sort((task1, task2) => {
                                       // if it's current task send to top
                                    if (task1.id === this.state.currentTask.id) {
                                        return -1
                                    } else if (task2.id === this.state.currentTask.id) {
                                        return 1
                                    } else if (this.state.children.map(task => task.id).includes(task1.id) && 
                                                !this.state.children.map(task => task.id).includes(task2.id)) {
                                        return -1
                                    } else if (this.state.children.map(task => task.id).includes(task2.id) && 
                                    !this.state.children.map(task => task.id).includes(task1.id)) {
                                        return 1
                                    } else if (task1.active && !task2.active) {
                                        return -1
                                    } else if (task2.active && !task1.active) {
                                        return 1
                                    } else {
                                        return task1.name > task2.name ? 1 : -1
                                    }
                                })
                            ) ||
                            ([...this.state.parents, this.state.currentTask, ...this.state.children])
                        }
                        isSearching={this.state.contentChoice === 2 || this.state.contentChoice === 15}
                        selectTask={this._selectTask}
                        completeTask={this._completeTask}
                    />

                    <Dashboard
                        task={this.state.currentTask}
                        actions={[
                            this._goHome, 
                            null,
                            this._addTask, 
                            this._updateName,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            this._shareTask, 
                            null,
                            this._deleteTask,
                            null]}
                        contentChoice={this.state.contentChoice}
                        updateContent={this._updateContent}
                        searchTerm={this.state.searchTerm}
                        updateSearch={event => this._updateSearch(event.target.value)}
                        onReset={this._resetSearch}
                    />
                </>
                )) || (
                    <UserInput 
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