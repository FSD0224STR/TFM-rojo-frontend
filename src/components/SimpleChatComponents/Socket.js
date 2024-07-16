import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { url } from "../../apiService/url";
// "undefined" means the URL will be computed from the `window.location` object

export const socket = io(url);
