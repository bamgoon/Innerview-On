import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { Role } from '../../common/enums/Role';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z]+[a-z0-9]{4,15}$/)
  readonly account: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,16}$/)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[ㄱ-힣]/)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber('KR')
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Role;
}
