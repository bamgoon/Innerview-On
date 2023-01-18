import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  readonly mainTitle: string;

  @IsString()
  readonly subTitle: string;

  @IsDateString()
  readonly openDate: Date;

  @IsDateString()
  readonly closeDate: Date;

  @IsNotEmpty()
  readonly uids: number[];
}
