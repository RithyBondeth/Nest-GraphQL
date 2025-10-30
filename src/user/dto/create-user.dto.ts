import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
}