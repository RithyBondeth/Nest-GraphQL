import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ERole } from '@app/common/utils/enums/role.enum';

@InputType()
export class UpdateUserInputDto {
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
