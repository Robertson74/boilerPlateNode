/**
 * @file server.ts - Main entry point for application
 * @author Michael Robertson
 * @version 0.0.1
 */
import * as debug from "debug";
import * as http from "http";
import App from "./app";

debug("ts-express:server");

const defaultPort: number = 3000;
const baseTen: number = 10;

const port: number|string|boolean = normalizePort(process.env.PORT || defaultPort);
App.set("port", port);

const server: http.Server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number|string): number|string|boolean {
  const basePort: number = (typeof val === "string") ? parseInt(val, baseTen) : val;
  if (isNaN(basePort)) {
    return val;
  } else if (basePort >= 0) {
    return basePort;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  let bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
}

function onListening(): void {
  console.log("Listening on port " + port);
  const addr = server.address();
  let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
