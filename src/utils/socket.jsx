import { io } from "socket.io-client";
// const socket = io('localhost:3000/');
const socket = io('https://crypto-view.onrender.com');

export default socket;