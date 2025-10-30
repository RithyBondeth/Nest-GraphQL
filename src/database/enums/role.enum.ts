import { registerEnumType } from '@nestjs/graphql';

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(ERole, { name: 'Role' });
