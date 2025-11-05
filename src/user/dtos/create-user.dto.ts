import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from '@app/common/utils/enums/role.enum';

@InputType()
export class CreateUserInputDto {
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
