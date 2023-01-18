import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  create(createRoomDto) {
    return `${createRoomDto}방 생성`;
  }
  getAll() {
    return `모든 방 조회`;
  }
  getOne(id: number) {
    return `${id}} 방 조회`;
  }
  update(id: number, updateRoomDto) {
    return `${id} 방 수정, ${updateRoomDto}`;
  }
  delete(id: number) {
    return `${id} 방 삭제`;
  }
  enter(id: number) {
    return `${id} 방 입장`;
  }
}
