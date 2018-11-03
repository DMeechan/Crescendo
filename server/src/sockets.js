const Event = require('./events');
const event = new Event();

let numUsers = 0;

const clientConnected = () => {
    numUsers += 1;
    console.log(`Client connected: ${numUsers} online`);
}

const emitProjects = async (socket) => {
    try {
        const projects = await event.getProjects();
        socket.emit('allProjects', projects);
    } catch (error) {
        console.error(error);
    }
}

const emitTimeRegularly = socket => {
    const fiveSeconds = 5000;
    socket.emit('time', new Date().toTimeString());
    setInterval(() => {
        socket.emit('time', new Date().toTimeString());
    }, fiveSeconds);
}

const start = httpServer => {
    const io = require("socket.io")(httpServer);

    io.on('connection', async socket => {
        clientConnected();

        emitProjects(socket);
        emitTimeRegularly(socket);

        socket.on('createProject', async data => {
            await event.createProject(data.name);
            emitProjects(socket);
        });

        socket.on('deleteProject', async data => {
            await event.deleteProject(data._id);
            emitProjects(socket);
        });

        socket.on('addTrack', data => {

        });

        socket.on('deleteTrack', data => {

        });

        socket.on('disconnect', () => {
            numUsers -= 1;
            console.log(`Client disconnected: ${numUsers} online`);
        })

    });
};

module.exports = start;
