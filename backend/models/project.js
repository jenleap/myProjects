const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    columns: [{
        name: String,
        tasks: [{
            description: String
        }]
    }],
    isArchived: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('project', projectSchema);