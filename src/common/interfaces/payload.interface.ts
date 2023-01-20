import { Role } from '../enums/Role';

export interface Payload {
  id: number;
  name: string;
  role: Role;
}
