import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ERole } from 'utils/enums/role.enum';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field()
  username?: string;

  @IsEmail()
  @IsOptional()
  @Field()
  email?: string;

  @IsEnum(ERole)
  @IsOptional()
  @Field(() => ERole)
  role: ERole;
}
