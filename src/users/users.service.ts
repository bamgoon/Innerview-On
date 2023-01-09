import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async signUp(signUpData): Promise<void> {
    const { account, password, name, email, phoneNumber, role } = signUpData;
    const user = new User();
    user.account = account;
    user.password = password;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.role = role;
    await user.save();
  }
  signIn(signInData) {
    return `${signInData}로 로그인 진행`;
  }
  async getAll(): Promise<User[]> {
    return User.find();
  }
  async getOne(id: number): Promise<User> {
    return User.findOneBy({ id });
  }
  update(id: number, updateData) {
    return `${updateData}로 특정 유저 수정`;
  }
  async delete(id: number): Promise<void> {
    await User.delete({ id });
  }
}
