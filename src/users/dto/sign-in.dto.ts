import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  readonly account: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
