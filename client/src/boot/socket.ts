import { boot } from "quasar/wrappers";
import io, { Socket } from 'socket.io-client';

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

const socket = io('http://localhost:3030', {
  reconnectionDelayMax: 10000,
  transports: ["websocket"],
});

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
