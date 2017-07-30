import * as ioPkg from 'socket.io-client';
import Socket from './socket/socket.class';
import Player from "./player/player.class";

let io = ioPkg(process.env.SOCKET_URL);
let player = new Player();
let socket = new Socket(io, player);
