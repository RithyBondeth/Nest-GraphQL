import { ERole } from '../enums/role.enum';

export interface AuthJwtUser {
  id: number;
  role: ERole;
}
