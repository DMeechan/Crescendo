# Crescendo

Record and edit music together with your friends in real-time from around the world.

In a nutshell: Google Docs for collaborative music creation

## Architecture

- Front-end **Vue.js** client, hosted & built on [Netlify](https://crescendo-live.netlify.com/)
- Back-end **Node.js** application server running on [Heroku](https://intermusic.herokuapp.com/)
- **MongoDB** database hosted on [mLab](https://mlab.com)
- Upload & store audio files to [file.io](https://www.file.io/) (for simplicity)
- Using [socket.io](https://socket.io/) for realtime communication between server & clients (via web sockets)

### What does the back-end do?

The back-end Node.js performs three roles:

1. Receive updates to projects & tracks from clients (via web sockets)
2. Update the database
3. Broadcast the change to the clients (via web sockets)

### What does the front-end do?

1. Users can view and edit projects
2. Users can upload tracks to their projects

## Getting started

1. Clone the repository
2. `cd client` to enter client directory
3. Run `npm install` to install the client dependencies
4. Run `npm run dev`
5. Open up a separate Terminal and do the following
6. `cd server` to enter server directory
7. Run `npm install` to install the server dependencies
8. Copy the `.env.default` file to `.env` and fill it in with your MongoDB database credentials
9. Use `npm run dev` to start the back-end server

## Credit

Built by:

- [Stewart McGown](https://github.com/stewartmcgown)
- [Daniel Meechan](https://github.com/dmeechan)
- [Ryan Gibb](https://github.com/RyanGibb)
- [Joshua Bernard-Cooper](https://github.com/jbernardcooper)