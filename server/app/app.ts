import * as httpPkg		from 'http';
import * as express		from 'express';
import * as ioPkg		from 'socket.io';
import * as path		from 'path';

import IO from './io/io.class';

let app = express();
let http = httpPkg.createServer(app);
let io = ioPkg(http, { serveClient: false });
let socket = new IO(io);

/**
 * Express configuration
 */
app.use(express.static(__dirname + '/../public/dist'));

/**
 * Listener
 */
http.listen(process.env.SERVER_PORT || 8080, () => {
	if (process.env.NODE_ENV == "development")
		console.log("server listening on port " + process.env.SERVER_PORT);
});
