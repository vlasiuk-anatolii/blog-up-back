import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    path: '/socket.io',
    transports: ['polling', 'websocket'],
  },
})
export class CommentsGateway {
  @WebSocketServer()
  private readonly server: Server;

  handleCommentsUpdated() {
    this.server.emit('commentsUpdated');
  }
}
