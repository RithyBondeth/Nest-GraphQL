import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { ERole } from "src/database/enums/role.enum";

@InputType()
export class UpdateUserInput {
    @IsString()
    @Field()
    username?: string;

    @IsEmail()
    @Field()
    email?: string;

    @IsEnum(ERole)
    @Field(() => ERole)
    role: ERole;
}