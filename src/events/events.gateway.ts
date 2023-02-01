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
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  afterInit(@ConnectedSocket() socket: Socket) {
    console.log('wss init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('===========================================');
    console.log(`${socket.nsp.name}`);
    console.log(`${socket.id}, 소켓 연결 성공 👍`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id}, 소켓 연결 해제 ❌`);
    socket.nsp.emit('goodbye', socket.handshake.query.uid);
  }

  @UseGuards(WsGuard)
  @Roles(Role.MANAGER)
  @SubscribeMessage('manager')
  handleEnterManager(@ConnectedSocket() socket: Socket) {
    socket.join('manager');
    socket.join('signaling');
    console.log(`${socket.handshake.query.uid}(${socket.id}), manager 방 입장 성공 👍`);
    console.log(`${socket.handshake.query.uid}(${socket.id}), signaling 방 입장 성공 👍`);
    socket.in('signaling').emit('welcome', { uid: socket.handshake.query.uid, sid: socket.id });
  }

  @UseGuards(WsGuard)
  @Roles(Role.INTERVIEWER, Role.INTERVIEWEE)
  @SubscribeMessage('enter_request')
  handleEnterRequest(@ConnectedSocket() socket: Socket) {
    const data = {
      uid: socket.handshake.query.uid,
      sid: socket.id,
    };
    socket.in('manager').emit('enter_request', data);
  }

  @UseGuards(WsGuard)
  @Roles(Role.MANAGER)
  @SubscribeMessage('enter_user')
  handleEnter(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { uid, sid } = data;
    socket.nsp.sockets.get(sid).join('signaling');
    console.log(`${uid}(${sid}), signaling 방 입장 성공 👍`);
    socket.in('signaling').emit('welcome', { uid, sid });
    // 본인은 제외하고 모든 유저에게 입장 알림해야할듯?
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('goodbye')
  handleGoodbye(@ConnectedSocket() socket: Socket) {
    socket.nsp.emit('goodbye', socket.handshake.query.uid);
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('offer')
  handleOffer(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { uid, sid, offer } = data;
    console.log(`${socket.handshake.query.uid}(${socket.id}), ${uid}(${sid})에게 offer 보냄`);
    socket.nsp.to(sid).emit('offer', { uid: socket.handshake.query.uid, sid: socket.id, offer });
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('answer')
  handleAnswer(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { uid, sid, answer } = data;
    console.log(`${socket.handshake.query.uid}(${socket.id}), ${uid}(${sid})에게 answer 보냄`);
    socket.nsp.to(sid).emit('answer', { uid: socket.handshake.query.uid, sid: socket.id, answer });
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('ice')
  handleIce(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { uid, sid, candidate } = data;
    console.log(`${socket.handshake.query.uid}(${socket.id}), ${uid}(${sid})에게 ice 보냄`);
    socket.nsp.to(sid).emit('ice', { uid: socket.handshake.query.uid, sid: socket.id, candidate });
  }

  @UseGuards(WsGuard)
  @Roles(...Object.values(Role))
  @SubscribeMessage('ice_close')
  handleIceClose(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    const { uid, sid } = data;
    console.log(`${socket.handshake.query.uid}(${socket.id}), ${uid}(${sid})에게 ice_close 보냄`);
    socket.nsp.to(sid).emit('ice_close', { uid: socket.handshake.query.uid, sid: socket.id });
  }
}
