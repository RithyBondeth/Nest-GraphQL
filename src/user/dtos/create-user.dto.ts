import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from 'utils/enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsEnum(ERole)
  @Field(() => ERole)
  role: ERole;
}
