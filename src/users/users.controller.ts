import {
  Controller,
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './security/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  signUp(@Body() signUpData: SignUpDto): Promise<void> {
    return this.usersService.signUp(signUpData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOne(@Param('id') uid: number): Promise<User> {
    return this.usersService.getOne(uid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(
    @Param('id') uid: number,
    @Body() updateData: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(uid, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') uid: number): Promise<void> {
    return this.usersService.delete(uid);
  }

  @Post('/signin')
  signIn(@Body() signInData: SignInDto): Promise<{ accessToken: string }> {
    return this.usersService.signIn(signInData);
  }
}
