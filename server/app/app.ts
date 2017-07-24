import * as httpPkg		from 'http';
import * as express		from 'express';
import * as ioPkg		from 'socket.io';
import * as path		from 'path';

let app = express();
let http = httpPkg.createServer(app);
let io = ioPkg(http);

app.get('/', (req, res) => {
	if (process.env.NODE_ENV == "development") console.log("GET /");
	res.sendFile(path.resolve("public/src/index.html"));
});

io.on('connection', (socket) => {
	if (process.env.NODE_ENV == "development") console.log("Socket connected");
	socket.emit('whoareyou');
});

http.listen(process.env.SERVER_PORT, () => {
	if (process.env.NODE_ENV == "development")
		console.log("server listening on port " + process.env.SERVER_PORT);
});
