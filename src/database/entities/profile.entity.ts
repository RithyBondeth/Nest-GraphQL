import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'profile' })
export class ProfileEntity {
  constructor(partial?: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  bio: string;

  @Field()
  @Column()
  avatar: string;

  @Field(() => UserEntity)
  @OneToOne(() => UserEntity, (userEntity) => userEntity.profile)
  user: UserEntity;
}
