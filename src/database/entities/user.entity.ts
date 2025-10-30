import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from './post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ERole } from '../enums/role.enum';

@ObjectType()
@Entity({ name: 'user' })
export class UserEntity {
  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => ERole)
  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @Field(() => ProfileEntity)
  @OneToOne(() => ProfileEntity, (profileEntity) => profileEntity.user)
  @JoinColumn()
  profile: Promise<ProfileEntity>;

  @Field(() => [PostEntity])
  @OneToMany(() => PostEntity, (postEntity) => postEntity.user, {
    cascade: true,
  })
  posts: Promise<PostEntity[]>;
}
