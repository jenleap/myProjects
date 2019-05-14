import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { getProjects, createNewProject } from '../actions/projects';
import Modal from '../components/common/Modal';
import NewProject from './projects/NewProject';
import requireAuth from './common/requireAuth';

class Dashboard extends Component {

    state = {
        modalOpen: false
    }

    componentWillMount() {
        this.props.getProjects(this.props.token);
    } 

    toggleProjectModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen});
    }

    render() {
        return (
            <div className="container">
                <Modal show={this.state.modalOpen}>
                    <NewProject toggleModal={this.toggleProjectModal} />
                </Modal>

                <button className="btn btn-secondary mt-3" onClick={this.toggleProjectModal}>Create New Project</button>

                <h6 className="text-muted mt-3 mb-1">ACTIVE PROJECTS</h6>

                <hr />

                <div>
                    {(this.props.projects.length > 0) ? (
                        this.props.projects.map(p => {
                            if (p.isArchived == false) {
                                return (
                                    <Link to={`/project/${p._id}`}>
                                        <div className="card bg-light mb-1">
                                            <div className="card-body">
                                                {p.name}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        })
                    ) : (
                        <div className="fa-3x">
                            <i className="fas fa-spinner fa-spin"></i>
                        </div>
                    )}
                </div>
                

                <h6 className="text-muted mt-5 mb-1">ARCHIVED PROJECTS</h6>

                <hr />

                {(this.props.projects.length > 0) ? (
                    this.props.projects.map(p => {
                        if (p.isArchived == true) {
                            return (
                                <Link to={`/project/${p._id}`}>
                                    <div className="card bg-light mb-1">
                                        <div className="card-body">
                                            {p.name}
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                ) : null}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
        projects: state.projects
    };
}

export default compose(
    connect(mapStateToProps, { getProjects, createNewProject }),
    requireAuth
)(Dashboard);