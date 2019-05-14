import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTask, deleteTask } from '../../actions/currentProject';

import EditBox from '../common/EditBox';
import SettingsDropdown from '../common/SettingsDropdown';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';

class Task extends Component  {

    state = {
        editTask: false,
        deleteModal: false
    }

    onDragTask = (e) => {
        //e.preventDefault();
    }

    onTaskDrop = (e) => {
        this.props.moveTask(this.props.task);
    }

    onDragTaskOver = () => {
        this.props.setEnds(this.props.index);
    }

    toggleEdit = () => {
        this.setState({ editTask: !this.state.editTask });
    }

    saveTaskUpdate = (description) => {
        const updatedTask = {
            ...this.props.task,
            description: description
        };
        this.props.updateTask(this.props.projectId, this.props.columnId, updatedTask, this.props.token);
        this.toggleEdit();
    }

    toggleDeleteModal = () => {
        this.setState({ deleteModal: !this.state.deleteModal });
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.projectId, this.props.columnId, this.props.task._id, this.props.token);
        this.toggleDeleteModal();
    }


    render() {
        return (
            <div onDragOver={this.onDragTaskOver} >
                <Modal show={this.state.deleteModal}>
                    <ConfirmDialog 
                        confirmMessage="Are you sure you want to delete this task?"
                        confirmAction={this.deleteTask}
                        cancelAction={this.toggleDeleteModal}
                    />
                </Modal>
                <div 
                    className="task mb-1 drag" 
                    draggable="true"
                    onDragStart={(e) => this.onDragTask(e)} 
                    onDragEnd={this.onTaskDrop}>
                    {(this.state.editTask) ? (
                        <EditBox 
                            currentValue={this.props.task.description} 
                            saveAction={this.saveTaskUpdate} />
                    ) : (
                        <div>
                            <span className="float-left">{this.props.task.description}</span>
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
                        </div>
                    )} 
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated
    };
}  
    
export default connect(mapStateToProps, {updateTask, deleteTask}) (Task);