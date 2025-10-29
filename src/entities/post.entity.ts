import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TagEntity } from './tag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'post' })
export class PostEntity {
  constructor(partial?: Partial<PostEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts)
  user: UserEntity;

  @Field(() => [TagEntity])
  @ManyToMany(() => TagEntity, (tagEntity) => tagEntity.posts)
  @JoinTable()
  tags: TagEntity[];
}
