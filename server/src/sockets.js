const Event = require('./events');
const event = new Event();

let numUsers = 0;

const clientConnected = io => {
    numUsers += 1;
    console.log(`Client connected: ${numUsers} online`);
    io.emit('users', {
        count: numUsers
    });
}

const emitProjects = async (io) => {
    try {
        const projects = await event.getProjects();
        io.emit('allProjects', projects);
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
        clientConnected(io);

        // Emit the projects to just that client
        const projects = await event.getProjects();
        socket.emit('allProjects', projects);
        emitTimeRegularly(socket);

        socket.on('createProject', async data => {
            await event.createProject(data.name);
            emitProjects(io);
        });

        socket.on('deleteProject', async data => {
            await event.deleteProject(data._id);
            emitProjects(io);
        });

        socket.on('addTrack', async data => {
            const exampleData = {
                projectId: '',
                name: '',
                url: '',
                length: '',
            };


            const { projectId } = data;
            const trackData = {
                name: data.name,
                url: data.url,
                length: data.length,
            };
            await event.addTrack(trackData, projectId);
            emitProjects(io);
        });

        socket.on('deleteTrack', async data => {
            await event.deleteProject(data._id);
            emitProjects(io);
        });

        socket.on('disconnect', () => {
            numUsers -= 1;
            console.log(`Client disconnected: ${numUsers} online`);
            io.emit('users', {
                count: numUsers
            });
        })

    });
};

module.exports = start;
