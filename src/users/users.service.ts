import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRoleType } from './UserRoleType';

export interface Payload {
  id: number;
  name: string;
  role: UserRoleType;
}

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}

  async signUp(signUpData: SignUpDto): Promise<void> {
    const { account, password, name, email, phoneNumber, role } = signUpData;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.account = account;
    user.password = hashedPassword;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.role = role;
    await user.save();
  }
  async signIn(signInData: SignInDto) {
    const { account, password } = signInData;
    const user = await User.findOneBy({ account });

    if (await verifyPassword(password, user.password)) {
      const payload: Payload = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(payload);

      return user;
    } else {
      return new User();
    }
  }
  async getAll(): Promise<User[]> {
    return User.find();
  }
  async getOne(id: number): Promise<User> {
    return User.findOneBy({ id });
  }
  async update(id: number, updateData: UpdateUserDto): Promise<UpdateResult> {
    return User.update({ id }, updateData);
  }
  async delete(id: number): Promise<void> {
    await User.delete({ id });
  }
}
