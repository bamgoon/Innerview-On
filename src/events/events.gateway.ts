import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from 'src/common/guards/ws.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role';

@WebSocketGateway({ namespace: /\/ws-.+/, cors: { orgin: '*' } })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;

  afterInit(@ConnectedSocket() socket: Socket) {
    console.log('wss init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('===============================');
    console.log(`${socket.id}, 소켓 연결 성공 👍`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id}, 소켓 연결 해제 ❌`);
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: string,
  ) {
    console.log(`${socket.id}, ${data}`);
  }
}
