import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addNewColumn, getProject, addNewTask, updateColumns, renameProject, archiveProject } from '../../actions/currentProject';
import requireAuth from '../common/requireAuth';

import AddBox from '../common/AddBox';
import Column from './Column';
import SettingsDropdown from '../common/SettingsDropdown';
import EditBox from '../common/EditBox';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';

class ProjectBoard extends Component {

    state = {
        addColumnMode: false,
        endIndex: '',
        endColumn: '',
        editName: false,
        archiveModal: false
    }

    componentWillMount() {
        const projectId = this.props.match.params.projectId;
        this.props.getProject(this.props.token, projectId);
    }

    toggleColumnMode = () => {
        this.setState({ addColumnMode: !this.state.addColumnMode });
    }

    addColumn = (column) => {
        this.props.addNewColumn(this.props.currentProject._id, column, this.props.token);
        this.toggleColumnMode();
    }

    addTask = (task, columnId) => {
        this.props.addNewTask(this.props.currentProject._id, columnId, task, this.props.token);
    }

    moveTask = (task) => {
        const { columns } = this.props.currentProject;

        //let task = {};
        let updatedColumns = [];

        for (let i = 0; i < columns.length; i++) {

            let tasks = columns[i].tasks.filter(t => t._id != task._id);
            let column = {
                ...columns[i],
                tasks: tasks
            };
            updatedColumns.push(column);

            /* columns[i].tasks.forEach(t => {
                if (t._id == taskId) {
                    return task = t;
                }
            }) */
        }

        updatedColumns.map(c => {
            if (c._id == this.state.endColumn) {
                return c.tasks.splice(this.state.endIndex, 0, task);
            }
            return c;
        }); 
        //console.log(updatedColumns);
        //console.log(this.state.endIndex);
        //console.log(this.state.endColumn);
        this.props.updateColumns(this.props.currentProject._id, updatedColumns, this.props.token);
    }

    setEnds = (index) => {
        //this.setState({ endColumn: columnId });
        this.setState({ endIndex: index });
    }

    setEndColumn = (columnId) => {
        this.setState({ endColumn: columnId});
    }

    onProjectEdit = () => {
        this.setState({ projectDropdown: !this.state.projectDropdown});
    }

    renameProject = () => {
        this.setState({ editName: !this.state.editName});
    }

    saveProjectName = (name) => {
        this.renameProject();
        const newName = {
            name: name
        };
        this.props.renameProject(this.props.currentProject._id, newName, this.props.token);
    }

    toggleArchiveModal = () => {
        this.setState({ archiveModal: !this.state.archiveModal });
    }

    archiveProject = () => {
        this.toggleArchiveModal();
        this.props.archiveProject(this.props.currentProject._id, this.props.token, () => {
            this.props.history.push('/dashboard');
        });
    }


    render() {
        //console.log(this.props.currentProject);
        return(
            <div className="container">
                {(Object.keys(this.props.currentProject).length === 0) ? (
                    <div className="fa-3x">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <div>
                        <Modal show={this.state.archiveModal}>
                            <ConfirmDialog 
                                confirmMessage="Are you sure you want to archive this project?"
                                confirmAction={this.archiveProject}
                                cancelAction={this.toggleArchiveModal}
                            />
                        </Modal>
                        {(this.state.editName) ? (
                            <EditBox 
                                currentValue={this.props.currentProject.name} 
                                saveAction={this.saveProjectName} />
                        ) : (
                            <div>
                                <h1 className="mt-2 float-left" style={{ display: 'inline-block'}}>{this.props.currentProject.name}</h1>
                                <SettingsDropdown 
                                    size="2" 
                                    additionalStyles="float-left ml-5 mt-3"
                                    listActions={[
                                        {
                                            title: "Rename",
                                            action: this.renameProject
                                        },
                                        {
                                            title: "Archive",
                                            action: this.toggleArchiveModal
                                        }
                                    ]}
                                />
                                <AddBox 
                                    addMode={this.state.addColumnMode}
                                    toggleBox={this.toggleColumnMode} 
                                    addItem={this.addColumn} 
                                    title="column"
                                    property="name" />

                                <div className="clearfix"></div>
                            </div>
                        )}
                        
                        
                        
                        
                        <hr />

                        {(this.props.currentProject.columns.length > 0) ? (
                            <div>
                                {this.props.currentProject.columns.map((c) => {
                                    return (
                                        <Column 
                                            column={c} 
                                            projectId={this.props.currentProject._id}
                                            addTask={this.addTask} 
                                            moveTask={this.moveTask} 
                                            setEnds={this.setEnds} 
                                            setEndColumn={this.setEndColumn}/>
                                    )
                                })}
                            </div>
                        ) : (
                            <h5>No columns yet.</h5>
                        )}
                        
                    </div>
                )}
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
        currentProject: state.currentProject
    };
}

export default compose(
    connect(mapStateToProps, { addNewColumn, getProject, addNewTask, updateColumns, renameProject, archiveProject }),
    requireAuth
)(ProjectBoard);