import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'tag' })
export class TagEntity {
  constructor(partial?: Partial<TagEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [PostEntity])
  @ManyToMany(() => PostEntity, (postEntity) => postEntity.tags)
  posts: Promise<PostEntity[]>;
}
