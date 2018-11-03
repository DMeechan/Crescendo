require("./database");
const { Project, Track } = require("./schemas");

class Event {
    constructor() {

    }

    async getProjects() {
        try {
            return await Project.find();
        } catch (error) {
            console.error(error);
            return {};
        }
    }
    
    async createProject(name) {
        try {
            await Project.create({
                name
            });
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProject(id) {
        try {
            await Project.deleteOne({ id });
        } catch (error) {
            console.error(error);
        }
    }

    async createTrack(name, url, length) {
        try {
            await Track.create({
                name, url, length
            });
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTrack(id) {
        try {
            await Track.deleteOne({ id });
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = Event;