import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewProject } from '../../actions/projects';

class NewProject extends Component {
    onSubmit = (formData) => {
        this.props.createNewProject(formData, this.props.token);
        this.props.toggleModal();
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form className="form-signin" onSubmit={ handleSubmit(this.onSubmit) }>
                <h4 className="mt-3 mb-4">Choose a name for your project.</h4>

                <fieldset className="mb-3">
                    <label className="sr-only">Name</label>
                    <Field 
                        className="form-control"
                        name="name"
                        type="text"
                        component="input"
                        placeholder="Project name"
                        autoComplete="none"
                    />
                </fieldset>

                <div>{this.props.errorMessage}</div>
                <button className="btn btn-lg btn-primary btn-block">Create Project</button>
                <h6 className="text-muted text-center mt-2" style={{cursor: 'pointer'}} onClick={this.props.toggleModal}>Cancel</h6>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
    };
}

export default compose(
    connect(mapStateToProps, { createNewProject }),
    reduxForm({ form: 'new-project' })
)(NewProject);