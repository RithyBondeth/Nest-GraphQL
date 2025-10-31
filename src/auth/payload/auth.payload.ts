import { ERole } from '@app/common/utils/enums/role.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => Int)
  userId: number;

  @Field(() => ERole)
  role: ERole;

  @Field()
  accessToken: string;
}
