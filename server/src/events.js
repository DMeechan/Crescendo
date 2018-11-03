const { Project, Track } = require("./schemas");


const events = () => ({
    getProjcts: async () => {
        // return await 
    },
    createProject: async name => {
        await Project.create({
            name
        });
    }
});

module.exports = events;