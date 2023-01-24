import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`${socket.id} connecting`);
    });
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('onMessage', { msg: 'new msg', content: data });
    return data;
  }
}
