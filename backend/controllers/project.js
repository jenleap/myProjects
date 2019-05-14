const Project = require('../models/project');
const User = require('../models/user');

exports.createNewProject = (req, res) => {
    const userId = req.userData.userId;
    const newProject = new Project({
        name: req.body.name,
        columns: []
    });

    newProject.save((err, project) => {
        if (err) {
            res.status(500).send(err);
        }
        User.findById(userId, (err, user) => {
            if (err) {
                res.status(500).send(err);
            }
            user.projects.push(project._id);
            user.save((err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(project);
            })
        });
    });
};

exports.getProjects = (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .populate('projects')
        .then((user) => {
            res.status(200).json({
                projects: user.projects
            });
        });
};

exports.getProject = (req, res) => {
    Project.findById(req.params.projectId)
        .then((project) => {
            res.status(200).json(project);
        })
}

exports.addColumn = (req, res) => {
    Project.findById(req.params.projectId)
        .then((project) => {
            project.columns.push({
                name: req.body.name,
                tasks: []
            });
            project.save((err, project) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(project);
            })
        })
};

exports.addTask = (req, res) => {
    Project.findById(req.params.projectId)
        .then((project) => {
            //console.log(project);
            let column = project.columns.filter(c => c._id == req.params.columnId);
            column[0].tasks.push({
                description: req.body.description
            });
            project.save((err, updatedProject) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(updatedProject);
            }) 
        })
        .catch(err => {
            console.log(err);
        })
};

exports.renameColumn = (req, res) => {
    Project.findById(req.params.projectId)
        .then((project) => {

            const updatedColumns = project.columns.map(c => {
                if (c._id == req.params.columnId) {
                    c.name = req.body.name;
                    return c;
                }
                return c;
            })

            project.columns = updatedColumns;
            project.save((err, updatedProject) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(updatedProject);
            })
        })
};

exports.deleteColumn = (req, res) => {
    Project.findById(req.params.projectId)
        .then((project) => {

            const updatedColumns = project.columns.filter(c => c._id != req.params.columnId);

            project.columns = updatedColumns;
            project.save((err, updatedProject) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(updatedProject);
            })
        })
};

exports.updateColumns = (req, res) => {
    console.log(req.body);
    Project.findById(req.params.projectId)
        .then((project) => {
            project.columns = req.body;
            project.save((err, updatedProject) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(201).json(updatedProject);
            })
        })
};

exports.renameProject = (req, res) => {
    Project.findById(req.params.projectId)
    .then((project) => {
        project.name = req.body.name;
        project.save((err, updatedProject) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).json(updatedProject);
        })
    })
}

exports.archiveProject = (req, res) => {
    Project.findById(req.params.projectId)
    .then((project) => {
        project.isArchived = true;
        project.save((err, updatedProject) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).json(updatedProject);
        })
    })
}

exports.updateTask = (req, res) => {
    Project.findById(req.params.projectId)
    .then((project) => {
        const { columns } = project;
        let updatedColumns = [];

        for (let i = 0; i < columns.length; i++) {

            if (columns[i]._id == req.params.columnId) {
                const updatedTasks = columns[i].tasks.map(t => {
                    if (t._id == req.params.taskId) {
                        t.description = req.body.description;
                        return t;
                    }
                    return t;
                })
                columns[i].tasks = updatedTasks;
                updatedColumns.push(columns[i]);
            } else {
                updatedColumns.push(columns[i]);
            }
        }
        project.columns = updatedColumns;
        project.save((err, updatedProject) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).json(updatedProject);
        }) 
    })
};

exports.deleteTask = (req, res) => {
    Project.findById(req.params.projectId)
    .then((project) => {
        const { columns } = project;
        let updatedColumns = [];

        for (let i = 0; i < columns.length; i++) {

            if (columns[i]._id == req.params.columnId) {
                const updatedTasks = columns[i].tasks.filter(t => t._id != req.params.taskId);
                columns[i].tasks = updatedTasks;
                updatedColumns.push(columns[i]);
            } else {
                updatedColumns.push(columns[i]);
            }
        }
        project.columns = updatedColumns;
        project.save((err, updatedProject) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(201).json(updatedProject);
        }) 
    })
};



