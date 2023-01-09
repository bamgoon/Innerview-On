import {
  Controller,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() signUpData) {
    return this.usersService.signUp(signUpData);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') uid: number) {
    return this.usersService.getOne(uid);
  }

  @Patch('/:id')
  update(@Param('id') uid: number, @Body() updateData) {
    return this.usersService.update(uid, updateData);
  }

  @Delete('/:id')
  delete(@Param('id') uid: number) {
    return this.usersService.delete(uid);
  }

  @Post('/signin')
  signIn(@Body() signInData) {
    return this.usersService.signIn(signInData);
  }
}
