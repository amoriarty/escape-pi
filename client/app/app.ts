import * as ioPkg from 'socket.io-client';
import Socket from './socket/socket.class';
import Player from "./player/player.class";
import Power from "./power/power.class";

let io = ioPkg(process.env.SOCKET_URL);
let player = new Player();
let socket = new Socket(io, player);
let power = new Power();

power.killomx();
