import * as http		from 'http';
import * as express		from 'express';

let app = express();

http.createServer(app).listen(8080, () => {
	console.log("server listening");
});
