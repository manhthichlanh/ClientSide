import { io } from "socket.io-client";
const socket = io('https://crypto-view.onrender.com');
export default socket;