import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { CreateRoomDto } from './dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MANAGER)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.roomsService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.roomsService.getOne(id);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MANAGER)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MANAGER)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.roomsService.delete(id);
  }

  @UseGuards(JwtGuard)
  @Get('/enter/:id')
  enter(@Param('id') id: number) {
    return this.roomsService.enter(id);
  }
}
