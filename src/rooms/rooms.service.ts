import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoomsService {
  async create(createRoomDto) {
    const { mainTitle, subTitle, openDate, closeDate, uids } = createRoomDto;
    const room = new Room();
    room.mainTitle = mainTitle;
    room.subTitle = subTitle;
    room.openDate = openDate;
    room.closeDate = closeDate;
    room.users = [];
    for (const id of uids) room.users.push(await User.findOneBy({ id }));

    await room.save();
  }
  async getAll() {
    return await Room.createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .select([
        'room.mainTitle',
        'room.subTitle',
        'user.name',
        'user.role',
        'user.email',
        'user.phoneNumber',
      ])
      .getMany();
  }
  async getOne(id: number) {
    return await Room.createQueryBuilder('room')
      .where('room.id = :id', { id })
      .leftJoin('room.users', 'user')
      .select([
        'room.mainTitle',
        'room.subTitle',
        'user.name',
        'user.role',
        'user.email',
        'user.phoneNumber',
      ])
      .getOne();
  }
  update(id: number, updateRoomDto) {
    return `${id} 방 수정, ${updateRoomDto}`;
  }
  async delete(id: number) {
    return await Room.delete({ id });
  }
  enter(id: number) {
    return `${id} 방 입장`;
  }
}
