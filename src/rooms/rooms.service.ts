import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateRoomDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  async create(createRoomDto: CreateRoomDto) {
    const { mainTitle, subTitle, openDate, closeDate, uids } = createRoomDto;
    const room = new Room();
    room.mainTitle = mainTitle;
    room.subTitle = subTitle;
    room.openDate = openDate;
    room.closeDate = closeDate;
    room.entryCode = uuidv4();
    room.users = [];
    for (const id of uids) room.users.push(await User.findOneBy({ id }));

    await room.save();
  }
  async getAll() {
    return await Room.createQueryBuilder('room')
      .leftJoin('room.users', 'user')
      .select([
        'room.id',
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
        'room.id',
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
