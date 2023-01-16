import { UserRoleType } from '../UserRoleType';

export interface Payload {
  id: number;
  name: string;
  role: UserRoleType;
}
