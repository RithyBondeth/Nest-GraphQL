import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
    @IsString()
    @Field()
    username: string;

    @IsEmail()
    @Field()
    email: string;
}