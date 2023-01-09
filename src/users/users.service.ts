import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  signUp(signUpData) {
    return `${signUpData}로 회원가입 진행`;
  }
  signIn(signInData) {
    return `${signInData}로 로그인 진행`;
  }
  getAll() {
    return `모든 유저 조회`;
  }
  getOne(id: number) {
    return `특정 유저 조회`;
  }
  update(id: number, updateData) {
    return `${updateData}로 특정 유저 수정`;
  }
  delete(id: number) {
    return `특정 유저 삭제`;
  }
}
