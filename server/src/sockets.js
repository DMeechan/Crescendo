const start = httpServer => {
    const io = require("socket.io")(httpServer);

    io.on('connection', socket => {
        console.log('Client connected');

        socket.emit('allProjects', [
            {
                id: 1,
                name: 'project1',
                tracks: [1, 2, 3],
            },
            {
                id: 2,
                name: 'project2',
                tracks: [],
            },
            {
                id: 3,
                name: 'project3',
                tracks: [4, 5, 6, 7],
            },
        ]);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        })

        const hundredSeconds = 100000;
        setInterval(() => {
            io.emit('time', new Date().toTimeString())
        }, hundredSeconds);

        socket.on('create project', data => {
            
        });

        socket.on('delete project', data => {

        });

        socket.on('add track', data => {

        });

        socket.on('delete track', data => {

        });

    });
};

module.exports = start;
