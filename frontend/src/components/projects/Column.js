import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renameColumn, deleteColumn } from '../../actions/currentProject';

import EditBox from '../common/EditBox';
import SettingsDropdown from '../common/SettingsDropdown';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';
import AddBox from '../common/AddBox';
import Task from './Task';

class Column extends Component {

    state = {
        addTaskMode: false,
        editMode: false,
        deleteModal: false
    }

    toggleTaskMode = () => {
        this.setState({ addTaskMode: !this.state.addTaskMode });
    }

    addTask = (task) => {
        this.props.addTask(task, this.props.column._id);
        this.toggleTaskMode();
    }

    onDragTaskOver = (e) => {
        this.props.setEndColumn(this.props.column._id);
    }

    toggleEdit = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    toggleDeleteModal = () => {
        this.setState({ deleteModal: !this.state.deleteModal });
    }

    saveColumnUpdate = (name) => {
        const column = {
            name: name
        };
        this.props.renameColumn(this.props.projectId, this.props.column._id, column, this.props.token);
        this.toggleEdit();
    }

    deleteColumn = () => {
        this.props.deleteColumn(this.props.projectId, this.props.column._id, this.props.token);
        this.toggleDeleteModal();
    }

    render() {
        return (
            <div className="project-column" onDragOver={(e) => this.onDragTaskOver(e)} >
                <Modal show={this.state.deleteModal}>
                    <ConfirmDialog 
                        confirmMessage="Are you sure you want to delete this column?"
                        confirmAction={this.deleteColumn}
                        cancelAction={this.toggleDeleteModal}
                    />
                </Modal>
                {(this.state.editMode) ? (
                    <EditBox 
                        currentValue={this.props.column.name} 
                        saveAction={this.saveColumnUpdate} />
                ) : (
                    <div>
                        <h4 className="inline-block float-left">{this.props.column.name}</h4>
                        <SettingsDropdown 
                                        size="1"
                                        additionalStyles="float-right" 
                                        listActions={[
                                            {
                                                title: "Edit",
                                                action: this.toggleEdit
                                            },
                                            {
                                                title: "Delete",
                                                action: this.toggleDeleteModal
                                            }
                                        ]}
                                    />
                        <div className="clearfix"></div>
                        {this.props.column.tasks.map((t, idx) => {
                            return (
                                <Task 
                                    index={idx} 
                                    task={t} 
                                    projectId={this.props.projectId}
                                    columnId={this.props.column._id}
                                    moveTask={this.props.moveTask}
                                    setEnds={this.props.setEnds}
                                    />
                            )
                        })}
                        <AddBox 
                            addMode={this.state.addTaskMode}
                            toggleBox={this.toggleTaskMode} 
                            addItem={this.addTask} 
                            title="task"
                            property="description" />
                            </div>
                        )}
            </div>
        ) 
    }
} 

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated
    };
}  
    
export default connect(mapStateToProps, {renameColumn, deleteColumn}) (Column);