import { ERole } from '../enums/role.enum';

export interface AuthJwtUser {
  userId: number;
  role: ERole;
}
