import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/Role';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Role[]>('ROLES_KEY', context.getHandler());
    const socket: Socket = context.getArgByIndex(0);
    const accessToken = socket.handshake.headers.authorization;
    try {
      const decoded = this.jwtService.verify(accessToken, this.configService.get('JWT_ACCESS_TOKEN'));
      return roles.includes(decoded.role);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
