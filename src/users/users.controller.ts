import { Controller, Param, Get, Patch, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { SignInDto, SignUpDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtGuard } from '../common/guards/jwt.guard';
import { UsersService } from './users.service';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() signUpData: SignUpDto): Promise<void> {
    return this.usersService.signUp(signUpData);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MANAGER)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MANAGER)
  @Get('/:id')
  getOne(@Param('id') uid: number): Promise<User> {
    return this.usersService.getOne(uid);
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  update(@Param('id') uid: number, @Body() updateData: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(uid, updateData);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  delete(@Param('id') uid: number): Promise<void> {
    return this.usersService.delete(uid);
  }

  @Post('/signin')
  signIn(@Body() signInData: SignInDto): Promise<{ accessToken: string }> {
    return this.usersService.signIn(signInData);
  }
}
