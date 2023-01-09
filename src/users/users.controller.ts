import {
  Controller,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Body,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() signUpData: SignUpDto): Promise<void> {
    return this.usersService.signUp(signUpData);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') uid: number): Promise<User> {
    return this.usersService.getOne(uid);
  }

  @Patch('/:id')
  update(@Param('id') uid: number, @Body() updateData) {
    return this.usersService.update(uid, updateData);
  }

  @Delete('/:id')
  delete(@Param('id') uid: number): Promise<void> {
    return this.usersService.delete(uid);
  }

  @Post('/signin')
  signIn(@Body() signInData) {
    return this.usersService.signIn(signInData);
  }
}
