const express = require('express');
const { createNewProject, getProjects, addColumn, addTask, updateColumns, getProject, renameProject, archiveProject, updateTask, deleteTask, renameColumn, deleteColumn } = require('../controllers/project');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', checkAuth, getProjects);
router.post('/', checkAuth, createNewProject);

router.get('/:projectId', checkAuth, getProject);
router.post('/:projectId', checkAuth, addColumn);
router.put('/:projectId', checkAuth, updateColumns);
router.put('/:projectId/rename', checkAuth, renameProject);
router.put('/:projectId/archive', checkAuth, archiveProject);

router.post('/:projectId/:columnId', checkAuth, addTask);
router.put('/:projectId/:columnId', checkAuth, renameColumn);
router.delete('/:projectId/:columnId', checkAuth, deleteColumn);

router.put('/:projectId/:columnId/:taskId', checkAuth, updateTask);
router.delete('/:projectId/:columnId/:taskId', checkAuth, deleteTask);

module.exports = router;