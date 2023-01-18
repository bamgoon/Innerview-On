import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  getAll() {
    return this.roomsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.roomsService.getOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.roomsService.delete(id);
  }

  @Get('/enter/:id')
  enter(@Param('id') id: number) {
    return this.roomsService.enter(id);
  }
}
