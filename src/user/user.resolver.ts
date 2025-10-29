import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/entities/user.entity';

@Resolver(() => UserEntity)
export class UserResolver {
    @Query(() => UserEntity, { name: 'users' }) 
    async findAll() {
        return [] as UserEntity[];
    }
}
