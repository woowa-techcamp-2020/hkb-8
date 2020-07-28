import app from "..";
import config from "../config";
import http from "http";

const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`server ${config.port} start!!`);
});
